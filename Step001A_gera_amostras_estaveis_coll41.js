/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var pampa = 
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
          
var bimoa250mil = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/biomas_IBGE_250mil')
var blank = ee.Image(0).mask(0);
var outline = blank.paint(bimoa250mil, 'AA0000', 2); 
var visPar = {'palette':'000000','opacity': 0.6};
Map.addLayer(outline, visPar, 'bimoa250mil', false);

var year = 2017
var palettes = require('users/mapbiomas/modules:Palettes.js');
var vis = {
    'bands': ['classification_' + String(year)],
    'min': 0,
    'max': 34,
    'palette': palettes.get('classification2')
};

var assetMosaics = 'projects/mapbiomas-workspace/MOSAICOS/workspace-c3';
var assetBiomes = 'projects/mapbiomas-workspace/AUXILIAR/biomas-raster';
var dirout = 'projects/mapbiomas-workspace/AMOSTRAS/col5/PAMPA/'
var biomes = ee.Image(assetBiomes);
var version_out = 'V01'

var colecao41 = ee.Image('projects/mapbiomas-workspace/COLECAO4_1/mapbiomas-collection41-integration-v9')
      
Map.addLayer(colecao41, vis, 'Classes ORIGINAIS 85 a 18', true);
print(colecao41)



var colList = ee.List([])
var col41remap = colecao41.select('classification_1985').remap(
    [3, 11,12,15,19,21,23,24,25,29,30,33],
    [3, 11,12,21,21,21,22,22,22,29,22,33])

colList = colList.add(col41remap.int8())

var anos = ['1986','1987','1988','1989','1990','1991','1992','1993','1994',
            '1995','1996','1997','1998','1999','2000','2001','2002','2003','2004',
            '2005','2006','2007','2008','2009','2010','2011','2012','2013','2014',
            '2015','2016','2017','2018'];

for (var i_ano=0;i_ano<anos.length; i_ano++){
  var ano = anos[i_ano];

  var col3flor = colecao41.select('classification_'+ano).remap(
    [3, 11,12,15,19,21,23,24,25,29,30,33],
    [3, 11,12,21,21,21,22,22,22,29,22,33])

  colList = colList.add(col3flor.int8())
};

var collection = ee.ImageCollection(colList)
print(collection)

var unique = function(arr) {
    var u = {},
        a = [];
    for (var i = 0, l = arr.length; i < l; ++i) {
        if (!u.hasOwnProperty(arr[i])) {
            a.push(arr[i]);
            u[arr[i]] = 1;
        }
    }
    return a;
};

var getFrenquencyMask = function(collection, classId) {

    var classIdInt = parseInt(classId, 10);

    var maskCollection = collection.map(function(image) {
        return image.eq(classIdInt);
    });

    var frequency = maskCollection.reduce(ee.Reducer.sum());

    var frequencyMask = frequency.gte(classFrequency[classId])
        .multiply(classIdInt)
        .toByte();

    frequencyMask = frequencyMask.mask(frequencyMask.eq(classIdInt));

    return frequencyMask.rename('frequency').set('class_id', classId);
};

var lista_image = ee.List([]);
var classFrequency = {"3": 34, "11": 30, "12": 34, "19": 34, "21": 34, "22": 34, "29": 24, "33": 34}

var frequencyMasks = Object.keys(classFrequency).map(function(classId) {
    return getFrenquencyMask(collection, classId);
});

frequencyMasks = ee.ImageCollection.fromImages(frequencyMasks);

var referenceMap = frequencyMasks.reduce(ee.Reducer.firstNonNull()).clip(pampa);

referenceMap = referenceMap.mask(referenceMap.neq(27)).rename("reference");

var vis = {
    'bands': ['reference'],
    'min': 0,
    'max': 34,
    'palette': palettes.get('classification2')
};

Map.addLayer(referenceMap, vis, 'Classes persistentes 85 a 18', true);

Export.image.toAsset({
    "image": referenceMap.toInt8(),
    "description": 'Pampa_amostras_estaveis85a18a_col41',
    "assetId": dirout + 'Pampa_amostras_estaveis85a18a_col41',
    "scale": 30,
    "pyramidingPolicy": {
        '.default': 'mode'
    },
    "maxPixels": 1e13,
    "region": pampa
});  

var regioesCollection = ee.FeatureCollection("users/evelezmartin/shp/Regioes_Pampa_coll05");
var blank = ee.Image(0).mask(0);
var outline = blank.paint(regioesCollection, 'AA0000', 2); 
var visPar = {'palette':'000000','opacity': 0.6};
Map.addLayer(outline, visPar, 'Regiao', true);