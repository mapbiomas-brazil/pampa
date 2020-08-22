// MAPBIOMAS PAMPA
// COLLECTION 05 
// AUTHOR: Juliano Schirmbeck
// DATE: August 2020
//

var regiao = 1;  
//var regiao = 2;  
//var regiao = 3;  
//var regiao = 4;  
//var regiao = 5;  
//var regiao = 6;  
//var regiao = 7; 

var versionIn = '11'

var filtro_espacial1 = function (regiao, version) {

 
var bioma = "PAMPA"

var versionOut = version + '_esp_pos_inci'
var versionIn = version + '_inci'


var anos = ['1986','1987','1988','1989','1990',
            '1991','1992','1993','1994','1995','1996','1997','1998','1999','2000',
            '2001','2002','2003','2004','2005','2006','2007','2008','2009','2010',
            '2011','2012','2013','2014','2015','2016','2017','2018','2019'];

var dircol5 = 'projects/mapbiomas-workspace/AMOSTRAS/col5/PAMPA/class_col5/'
var dir_filtros = 'projects/mapbiomas-workspace/AMOSTRAS/col5/PAMPA/class_col5_filtros/'
var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col05_buff')
var limite = regioesCollection.filterMetadata('ID', 'equals', regiao);

var imgGAP =  ee.Image(dir_filtros+ '0' + String(regiao) +'_RF85a19_v' + versionIn);

var palettes = require('users/mapbiomas/modules:Palettes.js');
var pal = palettes.get('classification2');
var vis = {
      bands: 'classification_1985',
      min:0,
      max:34,
      palette: pal,
      format: 'png'
    };
var vis2 = {
      min:0,
      max:34,
      palette: pal,
      format: 'png'
    };
Map.addLayer(imgGAP, vis, 'imgGAP');

var ano = '1985'

//var mask_85 = imgGAP.select('connect_'+ano)
var moda_85 = imgGAP.select('classification_'+ano).focal_mode(1, 'square', 'pixels')
moda_85 = moda_85.mask(imgGAP.select('connect_'+ano).lte(6))
var class_outTotal = imgGAP.select('classification_'+ano).blend(moda_85)
 
//var kernel = ee.Kernel.square(1)
//var neighs = imgGAP.select('classification_'+ano).neighborhoodToBands(kernel)//.mask(region)
//var majority = neighs.reduce(ee.Reducer.mode()).rename('classification_'+ano)
 
//print(class_outTotal)
Map.addLayer(class_outTotal, vis, 'class4 MODA');

for (var i_ano=0;i_ano<anos.length; i_ano++){  
  var ano = anos[i_ano]; 
  var moda = imgGAP.select('classification_'+ano).focal_mode(1, 'square', 'pixels')
  moda = moda.mask(imgGAP.select('connect_'+ano).lte(6))
  var class_out = imgGAP.select('classification_'+ano).blend(moda)
  class_outTotal = class_outTotal.addBands(class_out)
}
//print(class_outTotal)

Export.image.toAsset({
    'image': class_outTotal,
    'description': + '0' + String(regiao) + '_RF85a19_v' + versionOut,
    'assetId': dir_filtros + '0' + String(regiao) + '_RF85a19_v' + versionOut,
    'pyramidingPolicy': {
        '.default': 'mode'
    },
    'region': limite.geometry().bounds(),
    'scale': 30,
    'maxPixels': 1e13
  });
   return class_outTotal
}

print(filtro_espacial1(regiao,versionIn))

exports = {
  'filtro_espacial1': filtro_espacial1
}
