use serde::{
    ser::{SerializeMap, Serializer},
    Serialize,
};

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error("Request failed with error code {0}")]
    RequestError(String),
}

impl Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> std::result::Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}
#[derive(Debug)]
pub enum FeedRawType {
    Xml(String),
    Json(String),
}

impl Serialize for FeedRawType {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let mut map = serializer.serialize_map(Some(2))?;
        match self {
            FeedRawType::Xml(data) => {
                map.serialize_entry("type", "xml")?;
                map.serialize_entry("data", data)?;
            }
            FeedRawType::Json(data) => {
                map.serialize_entry("type", "json")?;
                map.serialize_entry("data", data)?;
            }
        };
        map.end()
    }
}
#[derive(Serialize, Debug)]
pub struct FeedRaw {
    #[serde(flatten)]
    data: FeedRawType,
    status: u16,
    content_type: String,
}

#[tauri::command]
pub async fn get_feed(url: String) -> Result<FeedRaw, Error> {
    let response = reqwest::get(&url).await.expect("Can not get feed");
    let content_type = (&response
        .headers()
        .get("content-type")
        .unwrap()
        .to_str()
        .unwrap())
        .to_string();
    let status = (&response.status()).as_u16();
    let text = response.text().await.unwrap().trim().to_string();

    Ok(FeedRaw {
        data: if content_type.contains("json") {
            FeedRawType::Json(text)
        } else {
            FeedRawType::Xml(text)
        },
        status: status,
        content_type: content_type,
    })

    // let content = reqwest::get(&url)
    //     .await
    //     .expect("Can not get feed")
    //     .text()
    //     .await
    //     .expect("Can not convert to text.");
    // return Ok(content);
}

#[tauri::command]
pub async fn get_article(url: String) -> Result<String, ()> {
    let content = reqwest::get(&url)
        .await
        .expect("Can not get feed")
        .text()
        .await
        .expect("Can not convert to text.");
    return Ok(content);
}

#[tauri::command]
pub async fn download_favicon(
    url: String,
    name: String,
    size: isize,
    app_handle: tauri::AppHandle,
) -> Result<String, ()> {
    let icon_url = format!("https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url={url}&size={size}", url=url, size=size);
    let content = reqwest::get(icon_url)
        .await
        .expect("Can not get feed")
        .bytes()
        .await
        .expect("Can not convert.");
    let app_dir = app_handle
        .path_resolver()
        .app_local_data_dir()
        .expect("Can not get app dir");

    let icons_path = &app_dir.join("icons");
    let image_path = &icons_path.join(format!("{name}.png", name = &name));

    std::fs::create_dir_all(icons_path).unwrap();
    let result = std::fs::write(image_path, content);
    match result {
        Ok(_) => Ok(image_path
            .to_str()
            .expect("Can not convert to str")
            .to_owned()),
        Err(_) => Ok("".to_string()),
    }
}
