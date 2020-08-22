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

var version = '11'

var incidente_floresta_outros = function (regiao, version) {

var bioma = "PAMPA"

var versionOut = version +  '_inci'

var versionIn = version + '_freq'
var versionInFlo = version +  '_pre_inci_flor'
var versionInOutros = version +  '_pre_inci_outros'

var anos3 = [                                   '1986','1987','1988','1989','1990',
             '1991','1992','1993','1994','1995','1996','1997','1998','1999','2000',
             '2001','2002','2003','2004','2005','2006','2007','2008','2009','2010',
             '2011','2012','2013','2014','2015','2016','2017','2018','2019'];       
             
var anos = [                            '1985','1986','1987','1988','1989','1990',
            '1991','1992','1993','1994','1995','1996','1997','1998','1999','2000',
            '2001','2002','2003','2004','2005','2006','2007','2008','2009','2010',
            '2011','2012','2013','2014','2015','2016','2017','2018','2019'];

var dircol5 = 'projects/mapbiomas-workspace/AMOSTRAS/col5/PAMPA/class_col5/'
var dir_filtros = 'projects/mapbiomas-workspace/AMOSTRAS/col5/PAMPA/class_col5_filtros/'
var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col05_buff')
var limite = regioesCollection.filterMetadata('ID', 'equals', regiao);

var image_in =  ee.Image(dir_filtros+ '0' + String(regiao) +'_RF85a19_v' + versionIn);
var image_incidence = ee.Image(dir_filtros+ '0' + String(regiao) +'_RF85a19_v' + versionInFlo);
var image_incidence_outro = ee.Image(dir_filtros+ '0' + String(regiao) +'_RF85a19_v' +  versionInOutros);

var palettes = require('users/mapbiomas/modules:Palettes.js');
var pal = palettes.get('classification2');
var vis = {
      bands: 'classification_2018',
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
Map.addLayer(image_in, vis, 'image_in');

var palette_incidence = ["#C8C8C8","#FED266","#FBA713","#cb701b", "#cb701b", "#a95512", "#a95512", "#662000",  "#662000", "#cb181d"]



Map.addLayer(image_incidence, {bands: 'incidence', palette:palette_incidence, min:8, max:20}, "incidents", false);

var image_in_corrigida = image_in

print(image_incidence)


//mascara e corrige bordas instaveis para todas as classes
var maskIncid_borda2 = image_incidence_outro.select('connect').lte(6)
              .and(image_incidence_outro.select('incidence').gt(8))
//              .and((image_incidence_outro.select('mode').eq(3)).or(image_incidence_outro.select('mode').eq(21)))
maskIncid_borda2 = maskIncid_borda2.mask(maskIncid_borda2.eq(1))              
var corrige_borda2 = image_incidence_outro.select('classification_mode').mask(maskIncid_borda2)
Map.addLayer(image_incidence_outro, {}, 'image_incidence_outro', false);
Map.addLayer(corrige_borda2, vis2, 'corrige_borda2', false);
print('image_incidence_outro',image_incidence_outro)


//aplica filtro anual floresta
var maskIncid_anual = image_incidence.select('connect').gt(6)
              .and(image_incidence.select('connect').lt(66))
              .and(image_incidence.select('incidence').gt(10))
              .and((image_incidence.select('mode').eq(3)).or(image_incidence.select('mode').eq(21)))
maskIncid_anual = ee.Image(21).mask(maskIncid_anual)
Map.addLayer(maskIncid_anual, vis2, 'maskIncid_anual', false)


//corrige pequenas areas (minifundio) que são instaveis
var maskIncid_anual2 = image_incidence_outro.select('connect').gt(6)
              .and(image_incidence_outro.select('connect').lt(66))
              .and(image_incidence_outro.select('incidence').gt(10))
//              .and((image_incidence_outro.select('mode').eq(3)).or(image_incidence_outro.select('mode').eq(21)))
maskIncid_anual2 = image_incidence_outro.select('classification_mode').mask(maskIncid_anual2)
Map.addLayer(maskIncid_anual2, vis2, 'maskIncid_anual2', false)

var windowCorrecao = function(imagem, correcao, ano_alterar){
   var img_out = imagem.select('classification_1985')
   for (var i_ano=0;i_ano<anos3.length; i_ano++){  
     var ano = anos3[i_ano];
     if (ano < ano_alterar) {
       img_out = img_out.addBands(imagem.select('classification_'+ano))
     } else {
       img_out = img_out.addBands(imagem.select('classification_'+ano).blend(correcao))
     }
   }
   return img_out
}

var class_out = 21
//image_in_corrigida = image_in_corrigida.blend(corrige_borda)
image_in_corrigida = image_in_corrigida.blend(corrige_borda2)
image_in_corrigida = image_in_corrigida.blend(maskIncid_anual2)
image_in_corrigida = image_in_corrigida.blend(maskIncid_anual)


Map.addLayer(image_in_corrigida, vis, 'image_in corrigida');
    
for (var i_ano=0;i_ano<anos.length; i_ano++){  
  var ano = anos[i_ano]; 
  image_in_corrigida = image_in_corrigida.addBands(image_in_corrigida.select('classification_'+ano).connectedPixelCount(100,false).rename('connect_'+ano))
}
Map.setCenter(-50.90923, -31.00492, 15)
image_in_corrigida=image_in_corrigida.toByte()

print(image_in_corrigida)
//image_in_corrigida.toByte()
Export.image.toAsset({
    'image': image_in_corrigida,
    'description': '0' + String(regiao) + '_RF85a19_v' + versionOut,
    'assetId': dir_filtros + '0' + String(regiao) + '_RF85a19_v' + versionOut,
    'pyramidingPolicy': {
        '.default': 'mode'
    },
    'region': limite.geometry().bounds(),
    'scale': 30,
    'maxPixels': 1e13
});
return image_in_corrigida

}

print(incidente_floresta_outros(regiao, version))

exports = {
  'incidente_floresta_outros': incidente_floresta_outros
}

//incidente_floresta_outros