import { createClient } from 'npm:@supabase/supabase-js@2'
import nodemailer from 'npm:nodemailer@6.9.14'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: Deno.env.get('GMAIL_USER')!,
    pass: Deno.env.get('GMAIL_APP_PASSWORD')!,
  },
})

const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

Deno.serve(async (req) => {
  try {

    const record = await req.json()

    if (!record || typeof record.problem_id === 'undefined') {
      throw new Error('Invalid payload received from trigger.');
    }

    console.log(`[START] Processing interest for problem ID: ${record.problem_id}`)

    const { data: problemData, error: problemError } = await supabaseAdmin
      .from('problems')
      .select('collaboration_email_sent, problem_statement')
      .eq('id', record.problem_id)
      .single()

    if (problemError) throw new Error(`Problem query failed: ${problemError.message}`)
    console.log('[DEBUG] Fetched problem data successfully.')

    if (problemData.collaboration_email_sent) {
      console.log('[EXIT] Collaboration email already sent.')
      return new Response('OK', { status: 200 })
    }

    const { data: interests, error: interestsError } = await supabaseAdmin
      .from('interests')
      .select('user_email')
      .eq('problem_id', record.problem_id)
    
    if (interestsError) throw new Error(`Interests query failed: ${interestsError.message}`)
    
    const recipients = interests.map((i) => i.user_email).filter(Boolean);
    console.log(`[DEBUG] Found ${recipients.length} interested users.`)

    if (recipients.length >= 2) {
      console.log(`[ACTION] Match found! Preparing to send email...`)

      await transporter.sendMail({
        from: `"The ArQuive" <${Deno.env.get('GMAIL_USER')!}>`,
        to: recipients.join(', '),
        subject: `Collaboration Match Found on The ArQuive!`,
        html: `
          <h1>Collaboration Opportunity!</h1>
          <p>Hello researchers,</p>
          <p>This is an automated message from The ArQuive. You are receiving this because you all expressed interest in the same open quantum problem.</p>
          <p>You can now connect with each other by replying to this email thread.</p>
          <p>Happy collaborating!</p>
          <p>&mdash; The ArQuive Team</p>
        `,
      })
      console.log(`[SUCCESS] Email sent to: ${recipients.join(', ')}`)

      const { error: updateError } = await supabaseAdmin
        .from('problems')
        .update({ collaboration_email_sent: true })
        .eq('id', record.problem_id)

      if (updateError) throw new Error(`Failed to update problem flag: ${updateError.message}`)
      console.log('[SUCCESS] Problem flag updated to true.')
    } else {
        console.log(`[EXIT] No match yet (${recipients.length} < 2).`)
    }

    console.log('[END] Function finished successfully.')
    return new Response('OK', { status: 200 })
  } catch (error) {
    console.error('[FATAL ERROR] in Matchmaker function:', error.message)
    return new Response(error.message, { status: 500 })
  }
})