// MAPBIOMAS PAMPA
// COLLECTION 05 
// AUTHOR: Juliano Schirmbeck
// DATE: August 2020

var versao = 'v01'
var sufixName = 'LabGeo'
var dirout = 'projects/mapbiomas-workspace/AMOSTRAS/col5/PAMPA/SAMPLES/';
var dirasset = 'projects/mapbiomas-workspace/MOSAICOS/workspace-c3';

var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col05')
var bioma = "PAMPA";

var pts = ee.FeatureCollection('projects/mapbiomas-workspace/AMOSTRAS/col5/PAMPA/samples_col5_PAMPA_' + sufixName + '_' + versao)
//Map.addLayer(pts, {}, 'pontos', false)
//print('pontos',pts.first())
//var pts_reg = pts.filterMetadata('ID', 'equals', 1)
//print('pontos regiao',pts_reg)


var biomes = ee.Image('projects/mapbiomas-workspace/AUXILIAR/biomas-raster-41')
var bioma250mil_PA = biomes.mask(biomes.eq(6))
var palettes = require('users/mapbiomas/modules:Palettes.js');

Map.addLayer(bioma250mil_PA,{},"biome PAMPA",false)

{var bandNames = ee.List([
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
    'longitude',
    'latitude',
    'slope',
    'textG',
    'amp_ndvi_3anos'
]);
}
var bandNamesShort = ee.List(['a_evi2',
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

var anos = [
            //1985,//1986,
            //1987,1988,
           // 1989,
           // 1990,
            //1991,
            1992,
            //1993,1994,1995,1996,
            1997,1998,//1999,
            2000,
            //2001,
            2002,
            2003,//2004,
            2005,//2006,2007,2008,2009,
            //2010,2011,2012,2013,2014,
            //2015,2016,2017,2018,2019
            ];
var terrain = ee.Image("JAXA/ALOS/AW3D30_V1_1").select("AVE");
var slope = ee.Terrain.slope(terrain)
var square = ee.Kernel.square({radius: 5});

var regioes = [1,2,3,4,5,6,7]

for (var i_ano=0;i_ano<anos.length; i_ano++){
//for (var i_ano=0;i_ano<1; i_ano++){
  var ano = anos[i_ano];
  //print('ano',ano)
  for (var i_regiao=0;i_regiao<regioes.length; i_regiao++){
  //for (var i_regiao=0;i_regiao<1; i_regiao++){
    var regiao = regioes[i_regiao];
    //print('regiao',regiao)
    var limite = regioesCollection.filterMetadata('ID', "equals", regiao);
    Map.addLayer(limite, {}, 'limite regiao', false)
    
    var mosaicoTotal = ee.ImageCollection(dirasset)
                        .filterMetadata('biome', 'equals', bioma)
                        .filterMetadata('year', 'equals', (ano))
                        .filterBounds(limite)
                        .mosaic()

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
    Map.addLayer(amp3anos, visParNDFI_amp, 'amp3anos', true);
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
    //var  mosSHP = mosaicoTotal.rename(bnamesSHP)
//    print('mosaico',mosaicoTotal)
//    Map.addLayer(mosaicoTotal, {}, 'mosaico', false)
    
    var pts_reg = pts.filterMetadata('ID', 'equals', regiao)
//    print('n pontos',pts_reg.size())
    
    var training = mosaicoTotal.sampleRegions({
        'collection': pts_reg,
        'scale': 30,
        'tileScale': 4,
        'geometries': true
    });
    
//      var trainingSHP = mosSHP.sampleRegions({
//          'collection': pts_reg,
//          'scale': 30,
//          'tileScale': 4,
//          'geometries': true
//      });
    
    if (i_regiao == 0){ 
      var training_reg = training 
      //var training_regSHP = trainingSHP 
    }  
    else {
      training_reg = training_reg.merge(training);
      //training_regSHP = training_regSHP.merge(trainingSHP);
    }
    //print('regiao ' + String(regiao) + 'tamanho = ' +  String(training.size()))
  }    
  
//print('training', training)
//print('training limite',training.limit(1))
//print('training zise',training_reg.size())

//Map.addLayer(training_reg, {}, 'resultado final', false)
Export.table.toAsset(training_reg, 
                      'pontos_exp1_' + sufixName + '_' + versao + '_' + ano , 
                      dirout + 'pontos_exp1_' + sufixName + '_' + versao + '_' + ano);
Export.table.toDrive({
    collection: training_reg,
    fileFormat: 'SHP', // 'CSV',//KML,
    folder:'amostras_coll5_shp',
    description: 'pontos_exp1_' + sufixName + '_' + versao + '_' + ano + '_shp'
    })
}
