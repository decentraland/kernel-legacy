export const dataUrlRE = /^data:[^/]+\/[^;]+;base64,/
export const blobRE = /^blob:http/

export function resolveMapping(mapping: string | undefined, mappingName: string, baseUrl: string) {
  let url = mappingName
  if (mapping) {
    url = mapping
  }
  if (dataUrlRE.test(url)) {
    return url
  }
  if (blobRE.test(url)) {
    return url
  }
  return (baseUrl.endsWith('/') ? baseUrl : baseUrl + '/') + url
}

export async function loadGamekitEntrypoint(loadAPIs: (apiNames: string[]) => Promise<any>) {
  const { EnvironmentAPI } = (await loadAPIs(['EnvironmentAPI'])) as any
  const bootstrapData = await EnvironmentAPI.getBootstrapData()
  if (bootstrapData && bootstrapData.main) {
    const mappingName = bootstrapData.main
    const mapping = bootstrapData.mappings.find(($: { file: string; hash: string }) => {
      return $.file === mappingName
    })
    const url = resolveMapping(mapping && mapping.hash, mappingName, bootstrapData.baseUrl)
    const html = await fetch(url)
    if (html.ok) {
      return html.text()
    } else {
      throw new Error(`SDK: Error while loading ${url} (${mappingName} -> ${mapping})`)
    }
  }
}
