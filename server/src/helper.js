export function clean_url(url) {
  let full_url = url;

  if (!full_url.startsWith("http://") && !full_url.startsWith("https://")) {
    full_url = "http://" + url;
  }

  return full_url;
}
