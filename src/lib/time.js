const timezone = 'America/Sao_Paulo'
export function saoPauloDateTimeLocal(value) {
  if (!value) return ''
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: timezone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date(value)).reduce((result, part) => ({ ...result, [part.type]: part.value }), {})
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`
}
export function saoPauloLocalToIso(value) {
  if (!value) return value
  const [date, time = '00:00'] = value.split('T')
  const [year, month, day] = date.split('-').map(Number)
  const [hour, minute] = time.split(':').map(Number)
  const target = Date.UTC(year, month - 1, day, hour, minute)
  let timestamp = target
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const parts = new Intl.DateTimeFormat('en-GB', { timeZone: timezone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date(timestamp)).reduce((result, part) => ({ ...result, [part.type]: Number(part.value) }), {})
    const represented = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute)
    timestamp += target - represented
  }
  return new Date(timestamp).toISOString()
}
