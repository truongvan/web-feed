use std::path::PathBuf;

fn get_channels_path(app_dir: &PathBuf) -> PathBuf {
    let channel = PathBuf::from("channels");
    let channel_path = app_dir.join(channel);
    return channel_path;
}

#[tauri::command]
pub async fn get_configure_path(app_handle: tauri::AppHandle) -> Result<String, ()> {
    let app_dir = app_handle
        .path_resolver()
        .app_local_data_dir()
        .expect("Can not get app dir");
    let channel_path = get_channels_path(&app_dir);
    std::fs::create_dir_all(channel_path).unwrap();
    let os_string = app_dir.to_str().expect("Can not parse path");
    return Ok(os_string.to_string());
}
