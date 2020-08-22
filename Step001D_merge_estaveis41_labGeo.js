/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var limite_PAMPA = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-58.002325738520554, -30.3690718412503],
          [-56.72007815870479, -30.499295222564232],
          [-56.16245902390205, -31.200415614034142],
          [-55.15701247951905, -31.52056495976992],
          [-53.76394503847297, -32.62416660786271],
          [-53.58289929760831, -34.03358717080886],
          [-52.591745055671666, -33.39158320323276],
          [-51.9671866879957, -32.37302487360386],
          [-50.559119353770484, -31.32147088991393],
          [-49.71259257697394, -29.72257756616197],
          [-51.70483040130221, -29.481090891765277],
          [-53.1059501744738, -29.453420604840932],
          [-52.73163486370493, -28.69257522584727],
          [-51.92477114990625, -28.237323479340276],
          [-52.395449754990395, -27.385623119662082],
          [-53.09345232874166, -27.29073889388881],
          [-53.8796175313376, -27.426126162000646],
          [-55.18794051531749, -27.65496334385179],
          [-56.463382710195006, -28.589060140835674]]]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// MAPBIOMAS PAMPA
// COLLECTION 05 
// AUTHOR: Juliano Schirmbeck
// DATE: August 2020

var limite_PAMPA = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-58.002325738520554, -30.3690718412503],
          [-56.72007815870479, -30.499295222564232],
          [-56.16245902390205, -31.200415614034142],
          [-55.15701247951905, -31.52056495976992],
          [-53.76394503847297, -32.62416660786271],
          [-53.58289929760831, -34.03358717080886],
          [-52.591745055671666, -33.39158320323276],
          [-51.9671866879957, -32.37302487360386],
          [-50.559119353770484, -31.32147088991393],
          [-49.71259257697394, -29.72257756616197],
          [-51.70483040130221, -29.481090891765277],
          [-53.1059501744738, -29.453420604840932],
          [-52.73163486370493, -28.69257522584727],
          [-51.92477114990625, -28.237323479340276],
          [-52.395449754990395, -27.385623119662082],
          [-53.09345232874166, -27.29073889388881],
          [-53.8796175313376, -27.426126162000646],
          [-55.18794051531749, -27.65496334385179],
          [-56.463382710195006, -28.589060140835674]]]);

var estaveis41ComAgri = ee.Image('projects/mapbiomas-workspace/AMOSTRAS/col5/PAMPA/Pampa_amostras_estaveis85a18a_col41_com_agricultura')

var estaveisLabGeo = ee.Image('projects/mapbiomas-workspace/AMOSTRAS/col5/PAMPA/Pampa_LabGeo_ss')


var visclass = {"min": 0, "max": 29,
        "palette": "d5d5e5,129912,1f4423,006400,00ff00," +
                   "687537,76a5af,29eee4,77a605,935132,ff9966,45c2a5," +
                   "b8af4f,f1c232,ffffb2,f6b26b,f6b26b,a0d0de," +
                   "e974ed,d5a6bd,c27ba0,FBF3C7,d0670f," +
                   "dd7e6b,b7b7b7,ff99ff," +
                   "0000ff,d5d5e5,afafaf,f76262",
      "format": "png"
  }
  

var estaveis_com_LabGeo = estaveis41ComAgri.add(estaveisLabGeo.unmask(ee.Image(0)))
estaveis_com_LabGeo = estaveis_com_LabGeo.remap([  0,   3,  11,  12,  21,  22,  29,  33,
                                                 100, 103, 111, 112, 121, 122, 129, 133,
                                                 200, 203, 211, 212, 221, 222, 229, 233], 
                                                [ 27,   3,  11,  27,  27,  22,  29,  33,
                                                  27,  27,  27,  12,  27,  27,  27,  27,
                                                  27,  27,  27,  27,  21,  27,  27,  27])



Map.addLayer(estaveis_com_LabGeo, visclass, 'estaveis_com_LabGeo_preMask', true)

estaveis_com_LabGeo = estaveis_com_LabGeo.mask(estaveis_com_LabGeo.neq(27)).rename("reference")


Map.addLayer(estaveis41ComAgri, visclass, 'estaveis41ComAgri', false)    
Map.addLayer(estaveisLabGeo, visclass, 'estaveisLabGeo', false)  
Map.addLayer(estaveis_com_LabGeo, visclass, 'estaveis_com_LabGeo', true)  
 

  Export.image.toAsset({
    "image": estaveis_com_LabGeo.toByte(),
    "description": 'Pampa_amostras_estaveis85a18a_col41_com_LabGeo',
    "assetId": 'projects/mapbiomas-workspace/AMOSTRAS/col5/PAMPA/Pampa_amostras_estaveis85a18a_col41_com_LabGeo',
    "scale": 30,
    "pyramidingPolicy": {
        '.default': 'mode'
    },
    "maxPixels": 1e13,
    "region": limite_PAMPA
});    

