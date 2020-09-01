# About
This folder contains the scripts to classify and post-process the Pampa Biome.
 
We recommend that you read the MapBiomas Appendix of the Algorithm Theoretical Basis Document (ATBD).

# How to use
First, you need to copy these scripts (including those in utils folder) to your Google Earth Engine (GEE) account.

# Pre-processing - preparing training data
* ***Step001A_stable_samples_coll41.js***: build stable pixels from Colleciton 4.1 and save a new asset;
* ***Step001B_stable_samples_agriculture.js***; 
* ***Step001C_estable_samples_weetland_coll41.js***; 
* ***Step001C_merge_estable41_agriculture.js***; 
* ***Step001D_merge_estable41_referenceMap.js***; 
* ***Step002_proportion_classes_2000.js***: calculate area proportion for each class to each region that will be used to generate training samples; 
* ***Step003_export_stable_sample_geometry.js***: export geometries (points) for training samples; 
* ***Step004_export_anual_sample.js***: export training samples for each year; 

# Classification -  run the random forest classification
* ***Step005_class_run_Pampa_R01_col05.js***: run the randonforest and export classification for region1; 
* ***Step005_class_run_Pampa_R02_col05.js***: run the randonforest and export classification for region2; 
* ***Step005_class_run_Pampa_R03_col05.js***: run the randonforest and export classification for region3; 
* ***Step005_class_run_Pampa_R04_col05.js***: run the randonforest and export classification for region4; 
* ***Step005_class_run_Pampa_R05_col05.js***: run the randonforest and export classification for region5; 
* ***Step005_class_run_Pampa_R06_col05.js***: run the randonforest and export classification for region6; 
* ***Step005_class_run_Pampa_R07_col05.js***: run the randonforest and export classification for region7; 

# Post-processing - apply filters
* ***Step006_Filter_01_gagfill.js***: filter tho replace pixels classified as Non Observed;
* ***Step006_Filter_02_espatial.js***: this filter uses a mask to change only those patches with pixels connected to five or less pixels of the same class;
* ***Step006_Filter_03_temporal.js***: filter uses the information from the previous year and the year later to identify and correct a pixel misclassification; 
* ***Step006_Filter_04_frequency_multiple.js***: this filter were applied to use the temporal information available for each pixel to correct cases of false positives; 
* ***Step006_Filter_05a_pre_incidence_forest.js***: prepare data to run incident filter; 
* ***Step006_Filter_05b_pre_incidence_others.js***: prepare data to run incident filter; 
* ***Step006_Filter_05c_incidence.js***: this filter were applied to correct the classification of pixels considered with an excessive amount of changes along the 35 years;  
* ***Step006_Filter_06_espatial_pos_inci.j***: this filter  uses a mask to change only those patches with pixels connected to five or less pixels of the same class, pos incidence filter corrections; 
* ***Step006_Filter_07_temporal_pos_incidence.js***: filter uses the information from the previous year and the year later to identify and correct a pixel misclassification, pos incidence filter corrections; 
* ***Step006_Filter_09_frequency_water_R1.js***: the fifth frequency filter corrected false positives of water in shaded relief covered with forest which appeared at region 1; 
* ***Step006_Filter_10_frequency_rocky.js***: tho resolve the confusion in rocky outcrop; 
* ***Step006_Filter_11_frequency_wetland.js***: to resolve the confusion in wetlands particularly with false positives of forest.