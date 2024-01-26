use winreg::RegKey;
use winreg::enums::*;
use std::process::Command;

#[tauri::command]
fn get_game_path() -> String {
    let system = RegKey::predef(HKEY_LOCAL_MACHINE)
        .open_subkey("SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Steam App 1091500");
    if system.is_ok()
    {
        let path: String = system.unwrap().get_value("InstallLocation").unwrap();
        return path;
    }
    return String::from("");
}

#[tauri::command]
fn start_executable(path: String) {
    Command::new(path).spawn().expect("Failed to run the binary");
}

#[tauri::command]
fn open_path(path: String) {
    Command::new("explorer")
        .args([&path]) // The comma after select is not a typo
        .spawn()
        .unwrap();
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![get_game_path, start_executable, open_path])
    .plugin(tauri_plugin_app::init())
    .plugin(tauri_plugin_os::init())
    .plugin(tauri_plugin_shell::init())
    .plugin(tauri_plugin_window::init())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
