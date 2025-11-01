export function save(key, val){ try{ sessionStorage.setItem(key, JSON.stringify(val)) }catch(e){} }
export function load(key, fallback){ try{ const v = sessionStorage.getItem(key); return v? JSON.parse(v):fallback }catch(e){ return fallback } }
