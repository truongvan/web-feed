use tauri::{CustomMenuItem, Menu, MenuEntry};

// here `"quit".to_string()` defines the menu item id, and the second parameter is the menu item label.

pub fn create_main_menu() -> Menu {
    let new = CustomMenuItem::new("new-feed".to_string(), "New Feed");
    let mut menu = Menu::os_default("WebFeed");
    let file_menu = menu.items.iter_mut().find(|inner| {
        if let MenuEntry::Submenu(submenu) = inner {
            return submenu.title == "File".to_string();
        } else {
            return false;
        }
    });
    if let Some(inner) = file_menu {
        if let MenuEntry::Submenu(submenu) = inner {
            let custom_menu = submenu.inner.clone();
            submenu.inner = custom_menu.add_item(new);
            // submenu.inner.add_item(new);
        }
    }

    return menu;
}
