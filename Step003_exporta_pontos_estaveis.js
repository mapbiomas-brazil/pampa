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
          

var bioma = "PAMPA";

// v01 para todas as classes serão buscadas 2000 amostras
//var versao = 'v01'
//var sampleSize = 2000;
//var nSamplesMin = 2000

// v02 serão estratificadas as amostras respeitando o limite mínimo
var versao = 'v02'
var sampleSize = 2000;
var nSamplesMin = 500


var sufixName = 'LabGeo'

var dirsamples = ee.Image('projects/mapbiomas-workspace/AMOSTRAS/col5/PAMPA/Pampa_amostras_estaveis85a18a_col41_com_' + sufixName + '').rename('reference')
var dirout = 'projects/mapbiomas-workspace/AMOSTRAS/col5/PAMPA/'
var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/PAMPA/Pampa_regions_col5_area2000')

var palettes = require('users/mapbiomas/modules:Palettes.js');

var vis = {
    'bands': ['reference'],
    'min': 0,
    'max': 34,
    'palette': palettes.get('classification2')
};
Map.addLayer(dirsamples, vis, 'Classes persistentes 85 a 18', true);

print(regioesCollection.size())

////////////////////////////////////////////////////////
var getTrainingSamples = function (feature) {
  var regiao = feature.get('ID');
  var floresta = ee.Number(feature.get('floresta'));
  var umido = ee.Number(feature.get('umido'));
  var campo = ee.Number(feature.get('campo'));
  var agro = ee.Number(feature.get('agro'));
  var anveg = ee.Number(feature.get('anveg'));
  var arochoso = ee.Number(feature.get('arochoso'));
  var agua = ee.Number(feature.get('agua'));
  
  var total = floresta.add(umido).add(campo).add(agro).add(anveg).add(arochoso).add(agua)

  var sampleFloSize = ee.Number(floresta).divide(total).multiply(sampleSize).round().int16().max(nSamplesMin)
  var sampleUmiSize = ee.Number(umido).divide(total).multiply(sampleSize).round().int16().max(nSamplesMin)
  var sampleCamSize = ee.Number(campo).divide(total).multiply(sampleSize).round().int16().max(nSamplesMin)
  var sampleAgrSize = ee.Number(agro).divide(total).multiply(sampleSize).round().int16().max(nSamplesMin)
  var sampleNVeSize = ee.Number(anveg).divide(total).multiply(sampleSize).round().int16().max(nSamplesMin)
  var sampleAflSize = ee.Number(arochoso).divide(total).multiply(sampleSize).round().int16().max(nSamplesMin)
  var sampleAguSize = ee.Number(agua).divide(total).multiply(sampleSize).round().int16().max(nSamplesMin)

  var clippedGrid = ee.Feature(feature).geometry()

  var referenceMap =  dirsamples.clip(clippedGrid);
                      

  var training = referenceMap.stratifiedSample({scale:30, classBand: 'reference', numPoints: 0, region: feature.geometry(), seed: 1, geometries: true,
           classValues: [3,11,12,21,22,29,33], 
           classPoints: [sampleFloSize,sampleUmiSize,sampleCamSize,sampleAgrSize,sampleNVeSize,sampleAflSize,sampleAguSize]
  });

  training = training.map(function(feat) {return feat.set({'ID': regiao})});
  return training;
 };

var mySamples = regioesCollection.map(getTrainingSamples).flatten();

Map.addLayer(mySamples)

print(mySamples.first())
print(mySamples.limit(1))


Export.table.toAsset(mySamples,
  'samples_col5_' + bioma + '_com_' + sufixName + '_' + versao,
  dirout + 'samples_col5_' + bioma + '_' + sufixName + '_' + versao)
  
