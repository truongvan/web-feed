// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use app::{self, menu::create_main_menu, migrations::initialize_db_schema};

fn main() {
    tauri::Builder::default()
        .menu(create_main_menu())
        .on_menu_event(|event| match event.menu_item_id() {
            "quit" => {
                std::process::exit(0);
            }
            "close" => {
                event.window().close().unwrap();
            }
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![
            app::feed::get_feed,
            app::feed::get_article,
            app::feed::download_favicon,
            app::configure::get_configure_path
        ])
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:app.db", initialize_db_schema())
                .build(),
        )
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
