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

var version = '1'
var bioma = "PAMPA"

var ano = '2000';

var dirasset = 'projects/mapbiomas-workspace/MOSAICOS/workspace-c3';
var dirout = 'projects/mapbiomas-workspace/AMOSTRAS/col5/PAMPA/'
var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col05_buff')
var colecao41 = ee.Image('projects/mapbiomas-workspace/public/collection4_1/mapbiomas_collection41_integration_v1').select('classification_' + ano);




var palettes = require('users/mapbiomas/modules:Palettes.js');
var vis = {
    'min': 0,
    'max': 34,
    'palette': palettes.get('classification2')
};

var pixelArea = ee.Image.pixelArea().divide(1000000);


colecao41 = colecao41.select('classification_' + ano).remap(
                            [3, 11,12,15,19,21,23,24,25,29,30,33],
                            [3, 11,12,21,21,21,22,22,22,29,22,33])

                
Map.addLayer(colecao41, vis, 'col41' + ano, false);

 
  var area03 = pixelArea.mask(colecao41.eq(3))
  var area11 = pixelArea.mask(colecao41.eq(11))
  var area12 = pixelArea.mask(colecao41.eq(12))
  var area21 = pixelArea.mask(colecao41.eq(21))
  var area22 = pixelArea.mask(colecao41.eq(22))
  var area29 = pixelArea.mask(colecao41.eq(29))
  var area33 = pixelArea.mask(colecao41.eq(33))

var processaReg = function(regiao) {
  regiao = regiao.set('floresta', ee.Number(area03.reduceRegion({reducer: ee.Reducer.sum(),geometry: regiao.geometry(), scale: 30,maxPixels: 1e13}).get('area')))
  regiao = regiao.set('umido', ee.Number(area11.reduceRegion({reducer: ee.Reducer.sum(),geometry: regiao.geometry(), scale: 30,maxPixels: 1e13}).get('area')))
  regiao = regiao.set('campo', ee.Number(area12.reduceRegion({reducer: ee.Reducer.sum(),geometry: regiao.geometry(), scale: 30,maxPixels: 1e13}).get('area')))
  regiao = regiao.set('agro', ee.Number(area21.reduceRegion({reducer: ee.Reducer.sum(),geometry: regiao.geometry(), scale: 30,maxPixels: 1e13}).get('area')))
  regiao = regiao.set('anveg', ee.Number(area22.reduceRegion({reducer: ee.Reducer.sum(),geometry: regiao.geometry(), scale: 30,maxPixels: 1e13}).get('area')))
  regiao = regiao.set('arochoso', ee.Number(area29.reduceRegion({reducer: ee.Reducer.sum(),geometry: regiao.geometry(), scale: 30,maxPixels: 1e13}).get('area')))
  regiao = regiao.set('agua', ee.Number(area33.reduceRegion({reducer: ee.Reducer.sum(),geometry: regiao.geometry(), scale: 30,maxPixels: 1e13}).get('area')))
  return regiao
}

var reg_class_area = regioesCollection.map(processaReg)
print(reg_class_area)



Export.table.toAsset(reg_class_area, 'Pampa_regions_col5_area2000', 'projects/mapbiomas-workspace/AUXILIAR/PAMPA/Pampa_regions_col5_area2000')

var blank = ee.Image(0).mask(0);
var outline = blank.paint(regioesCollection, 'AA0000', 2); 
var visPar = {'palette':'000000','opacity': 0.6};
Map.addLayer(outline, visPar, 'Regiao', true);
