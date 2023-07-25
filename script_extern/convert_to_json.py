import geopandas as gpd

def convert_shp_to_geojson(shp_file, geojson_file):
    # Read the shapefile
    gdf = gpd.read_file(shp_file)

    # Convert to GeoJSON
    gdf.to_file(geojson_file, driver='GeoJSON')

# Example usage
shp_file_path = 'D:/Permafrost_Interaktiv/Permafrost/permaice.shp'
geojson_file_path = 'D:/Permafrost_Interaktiv/Permafrost/permaice.geojson'

convert_shp_to_geojson(shp_file_path, geojson_file_path)

