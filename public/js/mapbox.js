/* eslint-disable */
export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiZHV5a2hhbmh0cmFuZGV2IiwiYSI6ImNsY29iaTR5djFocWEzcHA4b2xrMzlhcXAifQ.slmnIF2oq6gwtB64MJVjlg';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/duykhanhtrandev/clcocuvwx000p14rwzy4uy2j2',
    scrollZoom: false
    // center: [106.2951947410133, 20.199529769753415],
    // zoom: 10,
    // interactive: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>${loc.description}: ${loc.day} ngày</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
