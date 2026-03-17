use serde_json::Value;
use std::path::PathBuf;

/// 前端热更新目录 (~/.openclaw/clawpanel/web-update/)
pub fn update_dir() -> PathBuf {
    super::openclaw_dir().join("clawpanel").join("web-update")
}

/// 更新清单 URL（已禁用）
const LATEST_JSON_URL: &str = "";

/// 检查前端是否有新版本可用
#[tauri::command]
pub async fn check_frontend_update() -> Result<Value, String> {
    Ok(serde_json::json!({
        "currentVersion": env!("CARGO_PKG_VERSION"),
        "latestVersion": env!("CARGO_PKG_VERSION"),
        "hasUpdate": false,
        "compatible": true,
        "updateReady": false,
        "manifest": {"version": env!("CARGO_PKG_VERSION")}
    }))
}

/// 下载并解压前端更新包
#[tauri::command]
pub async fn download_frontend_update(_url: String, _expected_hash: String) -> Result<Value, String> {
    Ok(serde_json::json!({ "success": false }))
}
