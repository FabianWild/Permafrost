import geopandas as gpd
import json

def convert_shp_to_jsonp(shp_file, jsonp_file, callback_function):
    # Read the shapefile
    gdf = gpd.read_file(shp_file)

    # Convert to JSON
    json_data = gdf.to_json()

    # Wrap JSON data with the callback function
    jsonp_data = f"{callback_function}({json_data});"

    # Write JSONP to file
    with open(jsonp_file, 'w') as f:
        f.write(jsonp_data)

# Example usage
shp_file_path = 'C:/Permafrost/Permafrost/Shapefile/IRYP_v2_yedoma_domain.shp'
jsonp_file_path = 'C:/Permafrost/Permafrost/Shapefile/IRYP_v2_yedoma_domain.jsonp'
callback_function_name = 'myCallbackFunction'

convert_shp_to_jsonp(shp_file_path, jsonp_file_path, callback_function_name)
