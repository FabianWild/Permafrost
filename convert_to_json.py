import geopandas as gpd
import json

def convert_shp_to_json(shp_file, json_file):
    # Read the shapefile
    gdf = gpd.read_file(shp_file)

    # Convert to JSON
    json_data = gdf.to_json()

    # Write JSON to file
    with open(json_file, 'w') as f:
        f.write(json_data)

# Example usage
shp_file_path = 'C:/Permafrost/Permafrost/Shapefile/IRYP_v2_yedoma_domain.shp'
json_file_path = 'C:/Permafrost/Permafrost/Shapefile/IRYP_v2_yedoma_domain.json'

convert_shp_to_json(shp_file_path, json_file_path)
