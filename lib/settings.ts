import prisma from './prisma'

export async function getSetting(key: string, defaultValue: string = '') {
  const setting = await prisma.setting.findUnique({ where: { key } })
  return setting ? setting.value : defaultValue
}

export async function setSetting(key: string, value: string) {
  return await prisma.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value }
  })
}

export async function getSettings(keys: string[]) {
  const settings = await prisma.setting.findMany({
    where: { key: { in: keys } }
  })
  const result: Record<string, string> = {}
  keys.forEach(k => {
    const found = settings.find(s => s.key === k)
    result[k] = found ? found.value : ''
  })
  return result
}
