export const generateMetaBase = ({
  dataBase,
  title = null,
  des = null,
  image = null,
  override = false,
  overrideImage = false,
}: {
  dataBase: Record<string, any>
  title?: string | null
  des?: string | null
  image?: string | null
  override?: boolean
  overrideImage?: boolean
}) => {
  const dataClone = JSON.parse(JSON.stringify(dataBase))
  if (title) {
    dataClone.title = override ? title : `${process.env.NEXT_PUBLIC_TITLE} | ${title}`
    dataClone.openGraph.title = override ? title : `${process.env.NEXT_PUBLIC_TITLE} | ${title}`
    dataClone.openGraph.siteName = override ? title : `${process.env.NEXT_PUBLIC_TITLE} | ${title}`
    dataClone.twitter.title = override ? title : `${process.env.NEXT_PUBLIC_TITLE} | ${title}`
    dataClone.appleWebApp.title = override ? title : `${process.env.NEXT_PUBLIC_TITLE} | ${title}`
  }

  if (des) {
    dataClone.description = override ? des : `${dataBase.description} - ${des}`
    dataClone.openGraph.description = override ? des : `${dataBase.description} - ${des}`
    dataClone.twitter.description = override ? des : `${dataBase.description} - ${des}`
  }
  if (overrideImage && image) {
    dataClone.openGraph.images = [
      {
        url: image,
      },
    ]
    dataClone.twitter.images = image
  }
  return dataClone
}
