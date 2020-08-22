/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var controles = ee.FeatureCollection("users/evelezmartin/shp/Controles_regiao_cel_3km"),
    florest_r01 = /* color: #006400 */ee.FeatureCollection([]),
    aumi_r01 = /* color: #45c2a5 */ee.FeatureCollection([]),
    campo_r01 = /* color: #b8af4f */ee.FeatureCollection([]),
    agric_r01 = /* color: #ffefc3 */ee.FeatureCollection([]),
    anv_r01 = /* color: #ea9999 */ee.FeatureCollection([]),
    arocho_r01 = /* color: #ff8c00 */ee.FeatureCollection([]),
    agua_r01 = /* color: #0000ff */ee.FeatureCollection([]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// MAPBIOMAS PAMPA
// COLLECTION 05 
// AUTHOR: Juliano Schirmbeck
// DATE: August 2020
//
//  Randon Forest to region 05

var version_out = '11'
var versao_amostra = 'v01'
var versao_complementar = '03'
var sufixName = 'LabGeo'
var RFtrees = 100
var nBandas = 65

//var anos = ['2017'];

var anos = ['1985','1986','1987','1988','1989','1990','1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019'];


var regiao = 5
var collection_out = 5

var bioma = 'PAMPA'


//print('pontos_exp1_' + sufixName + '_' + versao_amostra + ' RFtrees = ' + RFtrees)

//conjunto de flags para ativar e desativar recursos de processamento
//*****************************************
//definir com 1 para usar e como zero para não usar
var usar_estaveis = 1
var usar_complementares5 = 1
var debug = 1   //variavel para usso de debug, habilita os prints e os addLayers

//*************************************
var dirasset = 'projects/mapbiomas-workspace/MOSAICOS/workspace-c3';
//pontos estaveis com propriedades
var dirsamples = 'projects/mapbiomas-workspace/AMOSTRAS/col5/PAMPA/SAMPLES/pontos_exp1_' + sufixName + '_'
var dircomple = 'projects/mapbiomas-workspace/AMOSTRAS/col5/PAMPA/'
var dirout = 'projects/mapbiomas-workspace/AMOSTRAS/col5/PAMPA/class_col5/'

var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col05_buff')
var limite = regioesCollection.filterMetadata('ID', 'equals', regiao);

var biomes = ee.Image('projects/mapbiomas-workspace/AUXILIAR/biomas-raster-41')
var bioma250mil_PA = biomes.mask(biomes.eq(6))


var palettes = require('users/mapbiomas/modules:Palettes.js');
var pall = palettes.get('classification2')


var vis = {
    'min': 0,
    'max': 34,
    'palette': palettes.get('classification2')
};

var terrain = ee.Image('JAXA/ALOS/AW3D30_V1_1').select('AVE');
var slope = ee.Terrain.slope(terrain)
var square = ee.Kernel.square({radius: 5});

//bandas
{
// 107 bandas
if (nBandas == 107)
{
  var bandNames = ee.List([
    'amp_evi2',
    'amp_gv',
    'amp_ndfi',
    'amp_ndvi',
    'amp_ndwi',
    'amp_npv',
    'amp_sefi',
    'amp_soil',
    'amp_wefi',
    'median_blue',
    'median_blue_dry',
    'median_blue_wet',
    'median_cai',
    'median_cai_dry',
    'median_cai_wet',
    'median_cloud',
    'median_evi2',
    'median_evi2_dry',
    'median_evi2_wet',
    'median_fns',
    'median_fns_dry',
    'median_fns_wet',
    'median_gcvi',
    'median_gcvi_dry',
    'median_gcvi_wet',
    'median_green',
    'median_green_dry',
    'median_green_wet',
    'median_gv',
    'median_gvs',
    'median_gvs_dry',
    'median_gvs_wet',
    'median_hallcover',
    'median_ndfi',
    'median_ndfi_dry',
    'median_ndfi_wet',
    'median_ndvi',
    'median_ndvi_dry',
    'median_ndvi_wet',
    'median_ndwi',
    'median_ndwi_dry',
    'median_ndwi_wet',
    'median_nir',
    'median_nir_dry',
    'median_nir_wet',
    'median_npv',
    'median_pri',
    'median_pri_dry',
    'median_pri_wet',
    'median_red',
    'median_red_dry',
    'median_red_wet',
    'median_savi',
    'median_savi_dry',
    'median_savi_wet',
    'median_sefi',
    'median_sefi_dry',
    'median_sefi_wet',
    'median_shade',
    'median_soil',
    'median_swir1',
    'median_swir1_dry',
    'median_swir1_wet',
    'median_swir2',
    'median_swir2_dry',
    'median_swir2_wet',
    'median_temp',
    'median_wefi',
    'median_wefi_dry',
    'median_wefi_wet',
    'min_blue',
    'min_green',
    'min_nir',
    'min_red',
    'min_swir1',
    'min_swir2',
    'min_temp',
    'slope',
    'stdDev_blue',
    'stdDev_cai',
    'stdDev_cloud',
    'stdDev_evi2',
    'stdDev_fns',
    'stdDev_gcvi',
    'stdDev_green',
    'stdDev_gv',
    'stdDev_gvs',
    'stdDev_hallcover',
    'stdDev_ndfi',
    'stdDev_ndvi',
    'stdDev_ndwi',
    'stdDev_nir',
    'stdDev_npv',
    'stdDev_pri',
    'stdDev_red',
    'stdDev_savi',
    'stdDev_sefi',
    'stdDev_shade',
    'stdDev_soil',
    'stdDev_swir1',
    'stdDev_swir2',
    'stdDev_temp',
    'stdDev_wefi',
    'textG',
    'longitude',
    'latitude',
    'amp_ndvi_3anos'
]);
  var bandNamesShort = ee.List([
'a_evi2',
'a_gv',
'a_ndfi',
'a_ndvi',
'a_ndwi',
'a_npv',
'a_sefi',
'a_soil',
'a_wefi',
'm_blue',
'm_blue_d',
'm_blue_w',
'm_cai',
'm_cai_d',
'm_cai_w',
'm_cloud',
'm_evi2',
'm_evi2_d',
'm_evi2_w',
'm_fns',
'm_fns_d',
'm_fns_w',
'm_gcvi',
'm_gcvi_d',
'm_gcvi_w',
'm_green',
'm_green_d',
'm_green_w',
'm_gv',
'm_gvs',
'm_gvs_d',
'm_gvs_w',
'm_hallcov',
'm_ndfi',
'm_ndfi_d',
'm_ndfi_w',
'm_ndvi',
'm_ndvi_d',
'm_ndvi_w',
'm_ndwi',
'm_ndwi_d',
'm_ndwi_w',
'm_nir',
'm_nir_d',
'm_nir_w',
'm_npv',
'm_pri',
'm_pri_d',
'm_pri_w',
'm_red',
'm_red_d',
'm_red_w',
'm_savi',
'm_savi_d',
'm_savi_w',
'm_sefi',
'm_sefi_d',
'm_sefi_w',
'm_shade',
'm_soil',
'm_sw1',
'm_sw1_d',
'm_sw1_w',
'm_sw2',
'm_sw2_d',
'm_sw2_w',
'm_temp',
'm_wefi',
'm_wefi_d',
'm_wefi_w',
'min_blue',
'min_green',
'min_nir',
'min_red',
'min_sw1',
'min_sw2',
'min_temp',
'slope',
'sD_blue',
'sD_cai',
'sD_cloud',
'sD_evi2',
'sD_fns',
'sD_gcvi',
'sD_green',
'sD_gv',
'sD_gvs',
'sD_hallcov',
'sD_ndfi',
'sD_ndvi',
'sD_ndwi',
'sD_nir',
'sD_npv',
'sD_pri',
'sD_red',
'sD_savi',
'sD_sefi',
'sD_shade',
'sD_soil',
'sD_sw1',
'sD_sw2',
'sD_temp',
'sD_wefi',
'textG',
'long',
'lat',
'a_ndvi_3'])
  
}

if (nBandas == 65)
{
  // 65 mais significativas
  var bandNames = ee.List(['median_fns_wet',
'min_temp',
'median_sefi',
'amp_soil',
'amp_ndfi',
'latitude',
'median_sefi_wet',
'amp_sefi',
'median_fns_dry',
'slope',
'stdDev_swir1',
'stdDev_gcvi',
'median_savi',
'median_swir2_dry',
'median_savi_dry',
'median_pri_dry',
'stdDev_temp',
'stdDev_hallcover',
'median_pri_wet',
'median_cloud',
'stdDev_blue',
'median_gcvi_wet',
'median_fns',
'median_ndvi_dry',
'amp_ndwi',
'median_red_dry',
'stdDev_soil',
'median_evi2_dry',
'min_blue',
'stdDev_savi',
'min_swir2',
'amp_ndvi_3anos',
'median_npv',
'min_red',
'median_red_wet',
'median_gcvi',
'median_blue_dry',
'amp_evi2',
'amp_gv',
'stdDev_ndvi',
'median_red',
'median_nir_dry',
'amp_npv',
'stdDev_sefi',
'median_gvs_wet',
'stdDev_red',
'median_ndvi',
'min_swir1',
'median_swir2_wet',
'median_evi2',
'median_ndwi',
'median_sefi_dry',
'median_evi2_wet',
'median_wefi_dry',
'median_swir2',
'stdDev_pri',
'median_ndwi_dry',
'median_hallcover',
'amp_ndvi',
'median_ndfi_dry',
'median_green_wet',
'stdDev_cloud',
'median_ndwi_wet',
'median_blue_wet',
'min_green'])
  var bandNamesShort = ee.List(['m_fns_w', 
'min_temp', 
'm_sefi', 
'a_soil', 
'a_ndfi', 
'lat', 
'm_sefi_w', 
'a_sefi', 
'm_fns_d', 
'slope', 
'sD_sw1', 
'sD_gcvi', 
'm_savi', 
'm_sw2_d', 
'm_savi_d', 
'm_pri_d', 
'sD_temp', 
'sD_hallcov', 
'm_pri_w', 
'm_cloud', 
'sD_blue', 
'm_gcvi_w', 
'm_fns', 
'm_ndvi_d', 
'a_ndwi', 
'm_red_d', 
'sD_soil', 
'm_evi2_d', 
'min_blue', 
'sD_savi', 
'min_sw2', 
'a_ndvi_3',
'm_npv', 
'min_red', 
'm_red_w', 
'm_gcvi', 
'm_blue_d', 
'a_evi2', 
'a_gv', 
'sD_ndvi', 
'm_red', 
'm_nir_d', 
'a_npv', 
'sD_sefi', 
'm_gvs_w', 
'sD_red', 
'm_ndvi', 
'min_sw1', 
'm_sw2_w', 
'm_evi2', 
'm_ndwi', 
'm_sefi_d', 
'm_evi2_w', 
'm_wefi_d', 
'm_sw2', 
'sD_pri', 
'm_ndwi_d', 
'm_hallcov', 
'a_ndvi', 
'm_ndfi_d', 
'm_green_w', 
'sD_cloud', 
'm_ndwi_w', 
'm_blue_w', 
'min_green'])
}
if (nBandas == 27)
{
  //banda col 41
  var bandNames = ee.List([
  'slope',
  'textG',
  'median_blue',
  'median_evi2',
  'median_green',
  'median_red',
  'median_nir',
  'median_swir1',
  'median_swir2',
  'median_gv',
  'median_gvs',
  'median_npv',
  'median_soil',
  'median_shade',
  'median_ndfi',
  'median_ndfi_wet',
  'median_ndvi',
  'median_ndvi_dry',
  'median_ndvi_wet',
  'median_ndwi',
  'median_ndwi_wet',
  'median_savi',
  'median_sefi',
  'stdDev_ndfi',
  'stdDev_sefi',
  'stdDev_soil',
  'stdDev_npv',
  ]);
  var bandNamesShort = ee.List([  
  'slope',
  'textG',
  'm_blue',
  'm_evi2',
  'm_green',
  'm_red',
  'm_nir',
  'm_sw1',
  'm_sw2',
  'm_gv',
  'm_gvs',
  'm_npv',
  'm_soil',
  'm_shade',
  'm_ndfi',
  'm_ndfi_w',
  'm_ndvi',
  'm_ndvi_d',
  'm_ndvi_w',
  'm_ndwi',
  'm_ndwi_w',
  'm_savi',
  'm_sefi',
  'sD_ndfi',
  'sD_sefi',
  'sD_soil',
  'sD_npv'])
}
}

var visParMedian = {'bands':['median_swir1','median_nir','median_red'], 'gain':[0.08, 0.06,0.2],'gamma':0.5 };



for (var i_ano=0;i_ano<anos.length; i_ano++){
  var ano = anos[i_ano];
  print(ano)
  var mosaicoTotal = ee.ImageCollection(dirasset)
                      .filterMetadata('biome', 'equals', bioma)
                      .filterMetadata('year', 'equals',parseInt(ano,10))
                      .filterBounds(limite)
                      .mosaic()
                      
  mosaicoTotal = mosaicoTotal.clip(limite)
  
  if (ano == 1985){//usa o valor do ano como apmlitude
    //var amp3anos = max3anos.subtract(min3anos).rename('amp_ndvi_3anos')
    var min3anos = mosaicoTotal.select('median_ndvi_dry')
    var max3anos = mosaicoTotal.select('median_ndvi_wet')
  }
  if (ano == 1986){//usa os 2 anos anteriores como amplitude
    //var amp3anos = max3anos.subtract(min3anos).rename('amp_ndvi_3anos')
    var mosaico1ano_antes = ee.ImageCollection(dirasset)
                    .filterMetadata('biome', 'equals', bioma)
                    .filterMetadata('year', 'equals', ( ano - 1))
                    .filterBounds(limite)
                    .mosaic()
    var min3anos = ee.ImageCollection.fromImages([mosaicoTotal.select('median_ndvi_dry'),
                                                mosaico1ano_antes.select('median_ndvi_dry')]).min()
    var max3anos = ee.ImageCollection.fromImages([mosaicoTotal.select('median_ndvi_wet'),
                                                mosaico1ano_antes.select('median_ndvi_wet')]).max()
  }
  if (ano > 1986){
    var mosaico1ano_antes = ee.ImageCollection(dirasset)
                    .filterMetadata('biome', 'equals', bioma)
                    .filterMetadata('year', 'equals', ( ano - 1))
                    .filterBounds(limite)
                    .mosaic()
    var mosaico2anos_antes = ee.ImageCollection(dirasset)
                    .filterMetadata('biome', 'equals', bioma)
                    .filterMetadata('year', 'equals', ( ano - 2))
                    .filterBounds(limite)
                    .mosaic()
    var min3anos = ee.ImageCollection.fromImages([mosaicoTotal.select('median_ndvi_dry'),
                                                mosaico1ano_antes.select('median_ndvi_dry'),
                                                mosaico2anos_antes.select('median_ndvi_dry')]).min()
    var max3anos = ee.ImageCollection.fromImages([mosaicoTotal.select('median_ndvi_wet'),
                                                mosaico1ano_antes.select('median_ndvi_wet'),
                                                mosaico2anos_antes.select('median_ndvi_wet')]).max()
  }
  var amp3anos = max3anos.subtract(min3anos).rename('amp_ndvi_3anos')

  var ndvi_color = '0f330f, 005000, 4B9300, 92df42, bff0bf, FFFFFF, eee4c7, ecb168, f90000'
  var visParNDFI_amp = {'min':0, 'max':60, 'palette':ndvi_color};
  //if (debug == 1){Map.addLayer(amp3anos, visParNDFI_amp, 'amp3anos', false)}
  mosaicoTotal = mosaicoTotal.addBands(amp3anos)

  var ll = ee.Image.pixelLonLat().mask(bioma250mil_PA);
  
  var long = ll.select('longitude').add(0).multiply(-1).multiply(1000).toInt16()
  var lati = ll.select('latitude').add(0).multiply(-1).multiply(1000).toInt16()

  mosaicoTotal = mosaicoTotal.addBands(long.rename('longitude'))
  mosaicoTotal = mosaicoTotal.addBands(lati.rename('latitude' ))
  
  mosaicoTotal = mosaicoTotal.addBands(slope.int8().clip(limite),['slope'])
  
  var entropyG = mosaicoTotal.select('median_green').entropy(square);
  mosaicoTotal = mosaicoTotal.addBands(entropyG.select([0],['textG']).multiply(100).int16())
 
  mosaicoTotal = mosaicoTotal.select(bandNames,bandNamesShort)
  
  //if (debug == 1){Map.addLayer(mosaicoTotal, visParMedian, 'Img_Year_'+ano, false)}

  if (usar_estaveis == 1){
    var SS_amostras = ee.FeatureCollection(dirsamples + versao_amostra + '_' + ano)
        .filterBounds(limite) 

    var SS_Flo = SS_amostras.filterMetadata('reference', 'equals', 3)
    var SS_Umi = SS_amostras.filterMetadata('reference', 'equals', 11)
    var SS_Cam = SS_amostras.filterMetadata('reference', 'equals', 12)
    var SS_Agr = SS_amostras.filterMetadata('reference', 'equals', 21)
    var SS_Anv = SS_amostras.filterMetadata('reference', 'equals', 22)
    var SS_Afr = SS_amostras.filterMetadata('reference', 'equals', 29)
    var SS_Agu = SS_amostras.filterMetadata('reference', 'equals', 33)

    //cria variavel com todas as amostras estáveis
    var training = SS_Flo
            //.merge(SS_Umi)
            .merge(SS_Cam)
            .merge(SS_Agr)
            .merge(SS_Anv)
            //.merge(SS_Afr)
            .merge(SS_Agu)
            
    //print('Tot Estaveis',training.size())
    //print('primeiro elemento estaveis',training.first())
    
  }
  if (usar_complementares5 == 1){
    
    var pts5 = ee.FeatureCollection('projects/mapbiomas-workspace/AMOSTRAS/col5/PAMPA/Complementar_samples_col5_Pontos_regiao0' + String(regiao) + '_V' + versao_complementar)
    //print(pts5)
    var complementares5 = mosaicoTotal.sampleRegions({
        'collection': pts5,
        'scale': 30,
        'tileScale': 4,
        'geometries': true
    });
    //print(complementares5)
    
/*
      var Pol5_Flo = PolsCom5.filterMetadata('reference', 'equals', 3)
      var Pol5_Umi = PolsCom5.filterMetadata('reference', 'equals', 11)
      var Pol5_Cam = PolsCom5.filterMetadata('reference', 'equals', 12)
      var Pol5_Agr = PolsCom5.filterMetadata('reference', 'equals', 21)
      var Pol5_Anv = PolsCom5.filterMetadata('reference', 'equals', 22)
      var Pol5_Afr = PolsCom5.filterMetadata('reference', 'equals', 29)
      var Pol5_Agu = PolsCom5.filterMetadata('reference', 'equals', 33)
      
      var trainingComp41 = Pts5_Flo
                            .merge(Pts5_Umi)
                            .merge(Pts5_Cam)
                            .merge(Pts5_Agr)
                            .merge(Pts5_Anv)
                            .merge(Pts5_Afr)
                            .merge(Pts5_Agu)  
                            .map(function (feature) {return feature.set('comp_coll', '41')});
      
      if(debug == 1){
       
       //print('Tot trainingComp41',trainingComp41.size())
       /* print('Pts5_Flo',Pts5_Flo.size())
        print('Pts5_Umi',Pts5_Umi.size())
        print('Pts5_Agr',Pts5_Agr.size())
        print('Pts5_Cam',Pts5_Cam.size())
        print('Pts5_Anv',Pts5_Anv.size())
        print('Pts5_Afr',Pts5_Afr.size())
        print('Pts5_Agu',Pts5_Agu.size())
       
      }
  
*/
  } 

  var training = training.merge(complementares5)

  //classificador sem informações de importÂncia e arvores 
  //print(training.first())
  var classifier = ee.Classifier.randomForest({numberOfTrees: RFtrees, variablesPerSplit:1}).train(training, 'reference', bandNamesShort);
  
  var classified = mosaicoTotal.classify(classifier).mask(mosaicoTotal.select('m_red'));
  classified = classified.select(['classification'],['classification_'+ano]).clip(limite.geometry()).toInt8()
  //if (debug == 1){print('classified',classified)}

  if (i_ano == 0){ var classified85a19 = classified }  
  else {classified85a19 = classified85a19.addBands(classified); }
} 


classified85a19 = classified85a19
    .set('collection', collection_out)
    .set('version', version_out)
    .set('biome', bioma)

Export.image.toAsset({
  'image': classified85a19.toInt8(),
  'description': regiao+'_'+'RF85a19_v'+version_out,
  'assetId': dirout + '0'+ regiao + '_' + 'RF85a19_v'+version_out,
  'scale': 30,
  'pyramidingPolicy': {
      '.default': 'mode'
  },
  'maxPixels': 1e13,
  'region': limite.geometry().bounds()
});     

var blank = ee.Image(0).mask(0);
var outline = blank.paint(limite, 'AA0000', 2); 
var visPar = {'palette':'000000','opacity': 0.6};
if (debug == 1){Map.addLayer(outline, visPar, 'Limite região 0' + String(regiao), false)}
Map.centerObject(limite.geometry())

