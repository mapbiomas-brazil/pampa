// MAPBIOMAS PAMPA
// COLLECTION 05 
// AUTHOR: Juliano Schirmbeck
// DATE: August 2020
//
//  Randon Forest to region 06

var regiao = 1;  var aplicar = {freq1: 1, freq2: 0, freq3: 0, freq4: 1}
//var regiao = 2;  var aplicar = {freq1: 1, freq2: 0, freq3: 0, freq4: 1}
//var regiao = 3;  var aplicar = {freq1: 1, freq2: 0, freq3: 1, freq4: 1}
//var regiao = 4;  var aplicar = {freq1: 1, freq2: 0, freq3: 0, freq4: 1}
//var regiao = 5;  var aplicar = {freq1: 1, freq2: 1, freq3: 1, freq4 :0}
//var regiao = 6;  var aplicar = {freq1: 1, freq2: 1, freq3: 1, freq4 :0}
//var regiao = 7;  var aplicar = {freq1: 1, freq2: 1, freq3: 1, freq4 :0}

var version = '11'

var filtro_fequencia = function (regiao, aplicar, versionIn) {

  var bioma = "PAMPA"
  
  var versionOut = version + '_freq'
  var versionIn = version + '_temp'
  
  var dircol5 = 'projects/mapbiomas-workspace/AMOSTRAS/col5/PAMPA/class_col5/'
  var dir_filtros = 'projects/mapbiomas-workspace/AMOSTRAS/col5/PAMPA/class_col5_filtros/'
  var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col05_buff')
  var limite = regioesCollection.filterMetadata('ID', 'equals', regiao);
  
  var image_in = ee.Image(dir_filtros + '0' + String(regiao) +'_RF85a19_v' + versionIn);

  var palettes = require('users/mapbiomas/modules:Palettes.js');
  var pal = palettes.get('classification2');
  var vis = {
        bands: 'classification_2010',
        min:0,
        max:34,
        palette: pal,
        format: 'png'
      };


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
 
//**********************************************
//******** Reras do filtro de frequencia 1
//**********************************************
//////Máscara de vegetacao nativa e agua (freq >x%)
  if (aplicar.freq1){
  var vegMask = ee.Image(0)
                           .where((florFreq
                           .add(umiFreq).add(grassFreq)
                           .add(anvFreq).add(arochFreq)
                           .add(aguaFreq))
                           .gt(80), 1)
  // ver necessidade de aumentar o limiar e 80%
  // usar de maneira conjugada a incidência maior que 1
  // ver quantos e quais os pixeis entram em cada condição (usar mask e reducer count)
  /////Mapa base: 
  var  vegMap = ee.Image(0)
                          //.where(vegMask.eq(1).and(florFreq.gt(90)), 3)
                          .where(vegMask.eq(1).and(umiFreq.gt(51)), 11)
                          //.where(vegMask.eq(1).and(grassFreq.gt(90)), 12)
                          .where(vegMask.eq(1).and(anvFreq.gt(90)), 22)
                          .where(vegMask.eq(1).and(arochFreq.gt(90)), 29)
                          .where(vegMask.eq(1).and(aguaFreq.gt(90)), 33)
  vegMap = vegMap.updateMask(vegMap.neq(0))
  
  image_in = image_in.where(vegMap, vegMap)
  //export
}
//**********************************************
//******** Reras do filtro de frequencia 2
//**********************************************
// resolve arroz, area unmida e agua
if(aplicar.freq2){
  vegMask = ee.Image(0)
                           .where(agricFreq.gt(1)  //adicionado para coll 5 força que tenha ao menos um ano de agricultura //redundante com a regra abaixo, valido se modificar outra classe
                           .and((agricFreq
                           .add(umiFreq)
                           .add(aguaFreq))
                           .gt(75)), 1)
  
  /////Mapa base: 
  vegMap = ee.Image(0)
                          .where(vegMask.eq(1).and(agricFreq.gt(33)), 21)
  
  vegMap = vegMap.updateMask(vegMap.neq(0))
  
  image_in = image_in.where(vegMap, vegMap)
}
//**********************************************
//******** Reras do filtro de frequencia 3
//**********************************************
// resolve o problema de floresta nas areas umidas
if (aplicar.freq3){
  vegMask = ee.Image(0)
                         .where(florFreq.gt(1)  //adicionado para coll 5 força que tenha ao menos um ano de floresta
                         .and((florFreq
                         .add(umiFreq)
                         .add(aguaFreq))
                         .gt(75)), 1)
  /////Mapa base: 
  vegMap = ee.Image(0)
                        .where(vegMask.eq(1).and(aguaFreq.gt(33)), 33)    
                        .where(vegMask.eq(1).and(umiFreq.gt(33)), 11)   
                                                 
  vegMap = vegMap.updateMask(vegMap.neq(0))
  image_in = image_in.where(vegMap.and(image_in.eq(3)), vegMap)//.and(image_in.eq(3) adicinado na coll 5, serve para modificar somente pixeis que eram floresta
}
//**********************************************
//******** Reras do filtro de frequencia 4
//**********************************************
//
if (aplicar.freq4){
  vegMask = ee.Image(0)
                         .where(anvFreq.gt(1)
                         .and((anvFreq
                         .add(agricFreq)
                         .add(grassFreq)
                         .add(florFreq))
                         .gt(99)), 1)
  
  /////Mapa base: 
  var image_moda = image_in.reduce(ee.Reducer.mode());
  vegMap = ee.Image(0)
                        .where(vegMask.eq(1), image_moda)   
                         
                                                 
  vegMap = vegMap.updateMask(vegMap.neq(0))//.clip(BiomaPA)
  image_in = image_in.where(vegMap.and(image_in.eq(22)), vegMap) //.and(image_in.eq(22)) adicinado na coll 5, serve para modificar somente pixeis que eram floresta
}

var image_out = image_in

image_out = image_out
  .set('collection', 5)
  .set('version', versionOut)
  .set('biome', bioma)

//print(image_in)
print(image_out)


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
