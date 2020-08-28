// MAPBIOMAS PAMPA
// COLLECTION 05 
// AUTHOR: Juliano Schirmbeck
// DATE: August 2020
//


var regiao = 1;  
var version = '11'

var filtro_fequencia = function (regiao, aplicar, versionIn) {

  var bioma = "PAMPA"
  
  var versionOut = version + '_final_1'
  var versionIn = version + '_final'
  
  var dircol5 = 'projects/mapbiomas-workspace/AMOSTRAS/col5/PAMPA/class_col5/'
  var dir_filtros = 'projects/mapbiomas-workspace/AMOSTRAS/col5/PAMPA/class_col5_filtros/'
  var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col05_buff')
  var limite = regioesCollection.filterMetadata('ID', 'equals', regiao);
  
  var image_in = ee.Image(dir_filtros + '0' + String(regiao) +'_RF85a19_v' + versionIn);
  var img = image_in
  var palettes = require('users/mapbiomas/modules:Palettes.js');
  var pal = palettes.get('classification2');


  //Calculando frequencias
  // General rule
  var exp = '100*((b( 0)+b( 1)+b( 2)+b( 3)+b( 4)+b( 5)+b( 6)+b( 7)+b( 8)+b( 9)'+
                 '+b(10)+b(11)+b(12)+b(13)+b(14)+b(15)+b(16)+b(17)+b(18)+b(19)'+
                 '+b(20)+b(21)+b(22)+b(23)+b(24)+b(25)+b(26)+b(27)+b(28)+b(29)'+
                 '+b(30)+b(31)+b(32)+b(33)+b(34))/35 )';
  
// get frequency
var florFreq  = image_in.eq( 3).expression(exp);
var umiFreq   = image_in.eq(11).expression(exp);
var grassFreq = image_in.eq(12).expression(exp);
var anvFreq   = image_in.eq(22).expression(exp);
var arochFreq = image_in.eq(29).expression(exp);
var aguaFreq  = image_in.eq(33).expression(exp);
var agricFreq = image_in.eq(21).expression(exp);  
 
 
var image_moda = image_in.reduce(ee.Reducer.mode());
var vegMask = ee.Image(0)
                           .where((florFreq.add(aguaFreq))
                           .gt(97), 1)
var  vegMap = ee.Image(0)
                          .where(vegMask.eq(1).and(florFreq.gt(30)), 3)
image_in = image_in.where(vegMap, vegMap)
                            
var exp15a = '100*((b( 0)+b( 1)+b( 2)+b( 3)+b( 4)+b( 5)+b( 6)+b( 7)+b( 8)+b( 9)'+
                 '+b(10)+b(11)+b(12)+b(13)+b(14))/15 )';
var aguaFreq15a  = image_in.eq(33).expression(exp15a);

var vegMask = ee.Image(0)
                           .where((aguaFreq15a.gt(1).and(aguaFreq15a.lt(85))), 1)
var  vegMap = ee.Image(0)
                          .where(vegMask.eq(1), image_moda)

image_in = image_in.where(vegMap.and(image_in.eq(33)), vegMap)


var image_out = image_in

image_out = image_out
  .set('collection', 5)
  .set('version', versionOut)
  .set('biome', bioma)

//print(image_in)
print(image_out)

  var vis = {
        bands: 'classification_1985',
        min:0,
        max:34,
        palette: pal,
        format: 'png'
      };

Map.addLayer(img, vis, 'img');
Map.addLayer(image_out, vis, 'filtered');

var diferenca = require('users/schirmbeckj/MapBiomas:Coll05/Passo019_Mapa_Diferencas_Classe.js').diferenca
print(diferenca(img,image_out))

Export.image.toAsset({
    'image': image_out,
    'description': + '0' + String(regiao) +'_RF85a19_v'+versionOut,
    'assetId': dir_filtros + '0' + String(regiao) +'_RF85a19_v'+versionOut,
    'pyramidingPolicy': {
        '.default': 'mode'
    },
    'region': limite.geometry().bounds(),
    'scale': 30,
    'maxPixels': 1e13
});
return image_out
}

print(filtro_fequencia(regiao, aplicar, version))

exports = {
  'filtro_fequencia': filtro_fequencia
}
