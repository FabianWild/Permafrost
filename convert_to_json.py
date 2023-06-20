import geopandas as gpd

def convert_shp_to_geojson(shp_file, geojson_file):
    # Read the shapefile
    gdf = gpd.read_file(shp_file)

    # Convert to GeoJSON
    gdf.to_file(geojson_file, driver='GeoJSON')

# Example usage
shp_file_path = 'C:/Permafrost/Permafrost/Shapefile/IRYP_v2_yedoma_domain.shp'
geojson_file_path = 'C:/Permafrost/Permafrost/Shapefile/IRYP_v2_yedoma_domain.geojson'

convert_shp_to_geojson(shp_file_path, geojson_file_path)

