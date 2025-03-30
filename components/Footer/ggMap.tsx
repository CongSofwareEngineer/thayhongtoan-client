import React from 'react'
// const AnyReactComponent = () => {
//   return (
//     <Tooltip title={<div>TC Store</div>}>
//       <MyImage
//         widthImage="30px"
//         heightImage="30px"
//         src={images.footer.iconGPS}
//         alt="gg-map-tsstore"
//       />
//     </Tooltip>
//   )
// }
const GgMap = () => {
  // const { isMobile } = useMedia()
  // const defaultProps = {
  //   center: {
  //     lat: 13.820217,
  //     lng: 107.751934,
  //   },
  //   zoom: 10,
  // }
  // useLayoutEffect(() => {
  //   scrollTop()
  // }, [])

  return (
    <div style={{ height: '100%', width: '100%', minHeight: 200 }}>
      {/* <GoogleMapReact
        style={{ height: isMobile ? 200 : '100%', width: '100%' }}
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_API_KEY_GG_MAP }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        zoom={15}
      >
        <AnyReactComponent />
      </GoogleMapReact> */}
      {/* <APIProvider
        onLoad={() => scrollTop()}
        apiKey={'AIzaSyAKoxPxbmoYXi99y-e5vDxozF94uzCYF6M'}
      >
        <Map
          style={{
            height: isMobile ? 200 : '100%',
            width: '100%',
            minHeight: 200,
          }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          zoom={15}

          // gestureHandling={'greedy'}
          // disableDefaultUI={true}
        >
          <AdvancedMarker
            position={{ lat: 20, lng: 10 }}
            title={'AdvancedMarker with customized pin.'}
          >
            <Pin
              background={'#22ccff'}
              borderColor={'#1e89a1'}
              glyphColor={'#0f677a'}
            ></Pin>
          </AdvancedMarker>
        </Map>
      </APIProvider> */}
      <iframe
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.925735303758!2d106.63089767616822!3d10.816995289334312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529d60f102fe1%3A0x48a05f8f5cd877f6!2zODMvNDEgUGjhuqFtIFbEg24gQuG6oWNoLCBQaMaw4budbmcgMTUsIFTDom4gQsOsbmgsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1723361925647!5m2!1svi!2s'
        className='w-full h-full'
        loading='lazy'
        title='TC Store'
      />
    </div>
  )
}

export default GgMap
