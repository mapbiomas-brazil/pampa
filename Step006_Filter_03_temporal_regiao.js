// MAPBIOMAS PAMPA
// COLLECTION 05 
// AUTHOR: Juliano Schirmbeck
// DATE: August 2020
// 
//  Randon Forest to region 06

var regiao = 1;  
//var regiao = 2;  
//var regiao = 3;  
//var regiao = 4;  
//var regiao = 5;  
//var regiao = 6;  
//var regiao = 7; 

var version = '11'

var filtro_temporal = function (regiao, version) {

  var bioma = "PAMPA"
  
  var versionOut = version + '_temp'
  var versionIn = version + '_esp'
  

  var anos3 = ['1986','1987','1988','1989','1990','1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018'];
  var anos4 = ['1986','1987','1988','1989','1990','1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017'];
  var anos5 = ['1986','1987','1988','1989','1990','1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016'];
  
  var dircol5 = 'projects/mapbiomas-workspace/AMOSTRAS/col5/PAMPA/class_col5/'
  var dir_filtros = 'projects/mapbiomas-workspace/AMOSTRAS/col5/PAMPA/class_col5_filtros/'
  var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col05_buff')
  var limite = regioesCollection.filterMetadata('ID', 'equals', regiao);
  
  var image_gapfill = ee.Image(dir_filtros+ '0' + String(regiao) +'_RF85a19_v' + versionIn);
  
  var palettes = require('users/mapbiomas/modules:Palettes.js');
  var vis = {
      'min': 0,
      'max': 34,
      'palette': palettes.get('classification2')
  };
  
  var mask3 = function(valor, ano, imagem){
    var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq (valor)
          .and(imagem.select('classification_'+ (ano)              ).neq(valor))
          .and(imagem.select('classification_'+ (parseInt(ano) + 1)).eq (valor))
    var muda_img = imagem.select('classification_'+ (ano)    ).mask(mask.eq(1)).where(mask.eq(1), valor);  
    var img_out = imagem.select('classification_'+ano).blend(muda_img)
    return img_out;
  }
  
  var mask4 = function(valor, ano, imagem){
    var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq (valor)
          .and(imagem.select('classification_'+ (ano)              ).neq(valor))
          .and(imagem.select('classification_'+ (parseInt(ano) + 1)).neq(valor))
          .and(imagem.select('classification_'+ (parseInt(ano) + 2)).eq (valor))
    var muda_img  = imagem.select('classification_'+ (ano)              ).mask(mask.eq(1)).where(mask.eq(1), valor);  
    var muda_img1 = imagem.select('classification_'+ (parseInt(ano) + 1)).mask(mask.eq(1)).where(mask.eq(1), valor); 
    var img_out = imagem.select('classification_'+ano).blend(muda_img).blend(muda_img1)
    return img_out;
  }
  
  var mask5 = function(valor, ano, imagem){
    var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq (valor)
          .and(imagem.select('classification_'+ (ano)              ).neq(valor))
          .and(imagem.select('classification_'+ (parseInt(ano) + 1)).neq(valor))
          .and(imagem.select('classification_'+ (parseInt(ano) + 2)).neq(valor))
          .and(imagem.select('classification_'+ (parseInt(ano) + 3)).eq (valor))
    var muda_img  = imagem.select('classification_'+ (ano)              ).mask(mask.eq(1)).where(mask.eq(1), valor);  
    var muda_img1 = imagem.select('classification_'+ (parseInt(ano) + 1)).mask(mask.eq(1)).where(mask.eq(1), valor);  
    var muda_img2 = imagem.select('classification_'+ (parseInt(ano) + 2)).mask(mask.eq(1)).where(mask.eq(1), valor);  
    var img_out = imagem.select('classification_'+ano).blend(muda_img).blend(muda_img1).blend(muda_img2)
    return img_out;
  }
  
  var window5years = function(imagem, valor){
     var img_out = imagem.select('classification_1985')
     for (var i_ano=0;i_ano<anos5.length; i_ano++){  
       var ano = anos5[i_ano];  
       img_out = img_out.addBands(mask5(valor,ano, imagem)) }
       img_out = img_out.addBands(imagem.select('classification_2017'))
       img_out = img_out.addBands(imagem.select('classification_2018'))
       img_out = img_out.addBands(imagem.select('classification_2019'))
     return img_out
  }
  
  var window4years = function(imagem, valor){
     var img_out = imagem.select('classification_1985')
     for (var i_ano=0;i_ano<anos4.length; i_ano++){  
       var ano = anos4[i_ano];  
       img_out = img_out.addBands(mask4(valor,ano, imagem)) }
       img_out = img_out.addBands(imagem.select('classification_2018'))
       img_out = img_out.addBands(imagem.select('classification_2019'))
     return img_out
  }
  
  var window3years = function(imagem, valor){
     var img_out = imagem.select('classification_1985')
     for (var i_ano=0;i_ano<anos3.length; i_ano++){  
       var ano = anos3[i_ano];   
       img_out = img_out.addBands(mask3(valor,ano, imagem)) }
       img_out = img_out.addBands(imagem.select('classification_2019'))
     return img_out
  }
  
  //put "classification_2019 in the end of bands after gap fill
  var original = image_gapfill.select('classification_1985')
  for (var i_ano=0;i_ano<anos3.length; i_ano++){  
    var ano = anos3[i_ano]; 
    original = original.addBands(image_gapfill.select('classification_'+ano)) 
  }
  original = original.addBands(image_gapfill.select('classification_2019'))
  
  var filtered = original
  
  var mask3first = function(valor, imagem){
    var mask = imagem.select('classification_1985').neq (valor)
          .and(imagem.select('classification_1986').eq(valor))
          .and(imagem.select('classification_1987').eq (valor))
    var muda_img = imagem.select('classification_1985').mask(mask.eq(1)).where(mask.eq(1), valor);  
    var img_out = imagem.select('classification_1985').blend(muda_img)
    img_out = img_out.addBands([imagem.select('classification_1986'),
                                imagem.select('classification_1987'),
                                imagem.select('classification_1988'),
                                imagem.select('classification_1989'),
                                imagem.select('classification_1990'),
                                imagem.select('classification_1991'),
                                imagem.select('classification_1992'),
                                imagem.select('classification_1993'),
                                imagem.select('classification_1994'),
                                imagem.select('classification_1995'),
                                imagem.select('classification_1996'),
                                imagem.select('classification_1997'),
                                imagem.select('classification_1998'),
                                imagem.select('classification_1999'),
                                imagem.select('classification_2000'),
                                imagem.select('classification_2001'),
                                imagem.select('classification_2002'),
                                imagem.select('classification_2003'),
                                imagem.select('classification_2004'),
                                imagem.select('classification_2005'),
                                imagem.select('classification_2006'),
                                imagem.select('classification_2007'),
                                imagem.select('classification_2008'),
                                imagem.select('classification_2009'),
                                imagem.select('classification_2010'),
                                imagem.select('classification_2011'),
                                imagem.select('classification_2012'),
                                imagem.select('classification_2013'),
                                imagem.select('classification_2014'),
                                imagem.select('classification_2015'),
                                imagem.select('classification_2016'),
                                imagem.select('classification_2017'),
                                imagem.select('classification_2018'),
                                imagem.select('classification_2019')])
    return img_out;
  }
  
  filtered = mask3first(33, filtered)// agua
  filtered = mask3first(29, filtered)//  A rochoso
  filtered = mask3first(22, filtered)// não veg
  filtered = mask3first(21, filtered)// mosaico
  filtered = mask3first(11, filtered)// umido 
  filtered = mask3first(3, filtered)// floresta
  filtered = mask3first(12, filtered)// campo

  //print(filtered)
  var mask3last = function(valor, imagem){
    var mask = imagem.select('classification_2017').eq (valor)
          .and(imagem.select('classification_2018').eq(valor))
          .and(imagem.select('classification_2019').neq (valor))
    var muda_img = imagem.select('classification_2019').mask(mask.eq(1)).where(mask.eq(1), valor);  
    var img_out = imagem.select('classification_1985')
    img_out = img_out.addBands([imagem.select('classification_1986'),
                                imagem.select('classification_1987'),
                                imagem.select('classification_1988'),
                                imagem.select('classification_1989'),
                                imagem.select('classification_1990'),
                                imagem.select('classification_1991'),
                                imagem.select('classification_1992'),
                                imagem.select('classification_1993'),
                                imagem.select('classification_1994'),
                                imagem.select('classification_1995'),
                                imagem.select('classification_1996'),
                                imagem.select('classification_1997'),
                                imagem.select('classification_1998'),
                                imagem.select('classification_1999'),
                                imagem.select('classification_2000'),
                                imagem.select('classification_2001'),
                                imagem.select('classification_2002'),
                                imagem.select('classification_2003'),
                                imagem.select('classification_2004'),
                                imagem.select('classification_2005'),
                                imagem.select('classification_2006'),
                                imagem.select('classification_2007'),
                                imagem.select('classification_2008'),
                                imagem.select('classification_2009'),
                                imagem.select('classification_2010'),
                                imagem.select('classification_2011'),
                                imagem.select('classification_2012'),
                                imagem.select('classification_2013'),
                                imagem.select('classification_2014'),
                                imagem.select('classification_2015'),
                                imagem.select('classification_2016'),
                                imagem.select('classification_2017'),
                                imagem.select('classification_2018')])
    var img_out = img_out.addBands(imagem.select('classification_2019').blend(muda_img))
    return img_out;
  }
  
  
  //executa o ultimo caso
  filtered = mask3last(21, filtered)
  print(filtered)
  
  //ordem de execução geral
  var ordem_exec = [33, 29, 22, 21, 11, 3, 12];
  
  for (var i_class=0;i_class<ordem_exec.length; i_class++){  
     var id_class = ordem_exec[i_class]; 
     filtered = window3years(filtered, id_class)
  }
  
  var vis = {
      'bands': 'classification_1990',
      'min': 0,
      'max': 34,
      'palette': palettes.get('classification2')
  };
  
  filtered = filtered.set('version', versionOut)
  
  Export.image.toAsset({
      'image': filtered,
      'description': + '0' + String(regiao) +'_RF85a19_v'+versionOut,
      'assetId': dir_filtros + '0' + String(regiao) +'_RF85a19_v'+versionOut,
      'pyramidingPolicy': {
          '.default': 'mode'
      },
      'region': limite.geometry().bounds(),
      'scale': 30,
      'maxPixels': 1e13
  });

return filtered
}

print(filtro_temporal(regiao,version))

exports = {
  'filtro_temporal': filtro_temporal
}