// MAPBIOMAS PAMPA
// COLLECTION 05 
// AUTHOR: Juliano Schirmbeck
// DATE: August 2020
//
//  Randon Forest to region 06

//ajustado coleção 5 junlho 2020
var regiao = 1;  var versionIn = '11'
//var regiao = 2;  var versionIn = '11'
//var regiao = 3;  var versionIn = '11'
//var regiao = 4;  var versionIn = '11'
//var regiao = 5;  var versionIn = '11'
//var regiao = 6;  var versionIn = '11'
//var regiao = 7;  var versionIn = '11' 
var filtro_gap = function (regiao, versionIn) {

var bioma = "PAMPA"

var versionOut = versionIn + '_gap'


var anos = ['1985','1986','1987','1988','1989','1990',
            '1991','1992','1993','1994','1995','1996','1997','1998','1999','2000',
            '2001','2002','2003','2004','2005','2006','2007','2008','2009','2010',
            '2011','2012','2013','2014','2015','2016','2017','2018','2019'];


var dircol5 = 'projects/mapbiomas-workspace/AMOSTRAS/col5/PAMPA/class_col5/'
var dir_filtros = 'projects/mapbiomas-workspace/AMOSTRAS/col5/PAMPA/class_col5_filtros/'
var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col05_buff')
var limite = regioesCollection.filterMetadata('ID', 'equals', regiao);

var image = ee.Image(dircol5 +  '0' + String(regiao) +'_RF85a19_v' + versionIn);


var palettes = require('users/mapbiomas/modules:Palettes.js');

var vis = {
    'min': 0,
    'max': 34,
    'palette': palettes.get('classification2')
};


//sempre usa um ano a menos, o primeiro
var bandNames = ee.List([
    'classification_1986','classification_1987',
    'classification_1988','classification_1989',
    'classification_1990','classification_1991',
    'classification_1992','classification_1993',
    'classification_1994','classification_1995',
    'classification_1996','classification_1997',
    'classification_1998','classification_1999',
    'classification_2000','classification_2001',
    'classification_2002','classification_2003',
    'classification_2004','classification_2005',
    'classification_2006','classification_2007',
    'classification_2008','classification_2009',
    'classification_2010','classification_2011',
    'classification_2012','classification_2013',
    'classification_2014','classification_2015',
    'classification_2016','classification_2017',
    'classification_2018','classification_2019'
]);

var filtered = bandNames.iterate(function (bandName, previousImage) {

	var currentImage = image.select(ee.String(bandName));

	previousImage = ee.Image(previousImage);

	currentImage = currentImage.unmask(previousImage.select([0]));

	return currentImage.addBands(previousImage);

}, ee.Image(image.select(['classification_1985'])));

filtered = ee.Image(filtered);

var bandNames = ee.List([
    'classification_1985','classification_1986',
    'classification_1987','classification_1988',
    'classification_1989','classification_1990',
    'classification_1991','classification_1992',
    'classification_1993','classification_1994',
    'classification_1995','classification_1996',
    'classification_1997','classification_1998',
    'classification_1999','classification_2000',
    'classification_2001','classification_2002',
    'classification_2003','classification_2004',
    'classification_2005','classification_2006',
    'classification_2007','classification_2008',
    'classification_2009','classification_2010',
    'classification_2011','classification_2012',
    'classification_2013','classification_2014',
    'classification_2015','classification_2016',
    'classification_2017','classification_2018',
]);

var filtered2 = bandNames.iterate(function (bandName, previousImage) {
	var currentImage = filtered.select(ee.String(bandName));
	previousImage = ee.Image(previousImage);
	currentImage = currentImage.unmask(previousImage.select(previousImage.bandNames().length().subtract(1)));
	return previousImage.addBands(currentImage);
}, ee.Image(filtered.select(["classification_2019"])));


filtered2 = ee.Image(filtered2)


Map.addLayer(image.select('classification_2000'), vis, 'image');
Map.addLayer(filtered2.select('classification_2000'), vis, 'filtered');

filtered2 = filtered2.set('vesion', '1');

for (var i_ano=0;i_ano<anos.length; i_ano++){  
  var ano = anos[i_ano]; 
  filtered2 = filtered2.addBands(filtered2.select('classification_'+ano).connectedPixelCount(100,false).rename('connect_'+ano))
}

Export.image.toAsset({
    'image': filtered2,
    'description': '0' + String(regiao) +'_RF85a19_v' + versionOut,
    'assetId': dir_filtros +  '0'+ String(regiao) +'_RF85a19_v'  + versionOut,
    'pyramidingPolicy': {
        '.default': 'mode'
    },
    'region': limite.geometry().bounds(),
    'scale': 30,
    'maxPixels': 1e13
});


var blank = ee.Image(0).mask(0);
var outline = blank.paint(limite, 'AA0000', 2); 
var visPar = {'palette':'000000','opacity': 0.6};
Map.addLayer(outline, visPar, 'regioes', false);

   return filtered2
};

print(filtro_gap(regiao,versionIn))

exports = {
  'filtro_gap': filtro_gap
}


