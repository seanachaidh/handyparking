package com.seanachaidh.handyparking.Resources;

import java.io.InputStream;
import java.net.URL;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpRequest.Builder;
import java.nio.charset.Charset;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.UUID;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

enum RequestType {
    GET,
    DELETE,
    PUT,
    POST
}

public abstract class Resource<T> {
    private final String restURL;
    private String rooturl;
    private HttpClient client;
    private Class<T[]> klass;
    
    private GsonBuilder buildGSON() {
        GsonBuilder builder = new GsonBuilder();
        builder.registerTypeAdapter(UUID.class, new UUIDJson());
        return builder;
    }

    public String getRestURL() {
        return restURL;
    }

    /**
     * Formats the RESTURL with the values in the hashmap
     * @param parameters
     * @return formated URL
     */
    public String formatURL(HashMap<String, String> parameters) {
        String url = this.getFullURL();
        if(parameters != null) {
            for (Entry<String, String> e : parameters.entrySet()) {
                String to_search = "{" + e.getKey() + "}";
                url = url.replace(to_search, e.getValue());
            }            
        }
        return url;
    }

    public String createUrlEncodedString(HashMap<String, String> toConvert) {
        String retval = "";
        if(toConvert != null) {
            for(Map.Entry<String,String> keyvals: toConvert.entrySet()){
                if(retval.equals("")){
                    retval += keyvals.getKey() + "=" + keyvals.getValue();
                } else {
                    retval += "&" + keyvals.getKey() + "=" + keyvals.getValue();
                }
            }            
        }
        return URLEncoder.encode(retval, Charset.forName("UTF-8"));
    }

    public HttpResponse<String> performRequest(RequestType t, HashMap<String, String> params, String postbody){
        HttpResponse<String> resp = null;
        HttpRequest request = null;
        try {
            URL fullurl = new URL(this.formatURL(params));
            Builder b = HttpRequest.newBuilder(fullurl.toURI());
            
            switch (t) {
                case GET:
                    request = b.GET().build();
                    break;
                case POST:
                    request = b.POST(BodyPublishers.ofString(postbody)).build();
                    break;
                case PUT:
                    request = b.PUT(BodyPublishers.ofString(postbody)).build();
                    break;
                case DELETE:
                    request = b.DELETE().build();
                    break;
                default:
                    break;
            }
            resp = this.client.send(request, HttpResponse.BodyHandlers.ofString());
        } catch(Exception e) {
            e.printStackTrace();
        }

        return resp;
    }

    private void parseConfiguration() {
        InputStream configurationStream = getClass().getClassLoader().getResourceAsStream("configuration.xml");
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        String rooturl = "";

        try {
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.parse(configurationStream);
            
            Element root = doc.getDocumentElement();
            NodeList nlist = root.getElementsByTagName("rooturl");
            Node rooturlnode = nlist.item(0);
            rooturl = rooturlnode.getTextContent();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            this.rooturl = rooturl;
        }
    }

    public String getFullURL(){
        return this.rooturl + this.restURL;
    }

    public Resource(Class<T[]> klass, String restURL, HttpClient client) {
        this.restURL = restURL;
        this.client = client;
        this.klass = klass;
        parseConfiguration();
    }
    
    public T[] get(HashMap<String, String> params, HashMap<String, String> body) {
        HttpResponse<String> response = this.performRequest(RequestType.GET, params,  "");

        String retval = response.body();
        GsonBuilder mybuilder = buildGSON();
        T[] result = mybuilder.create().fromJson(retval, this.klass);
        return result;
    }
    public Boolean post(HashMap<String, String> params, HashMap<String, String> body) {
        
        String urlEncodedBody = createUrlEncodedString(body);
        HttpResponse<String> response = this.performRequest(RequestType.POST, params, urlEncodedBody);
        String retval = response.body();

        JsonObject json = new JsonParser().parse(retval).getAsJsonObject();
        return json.get("result").getAsBoolean();
    }
    public Boolean put(HashMap<String, String> params, HashMap<String, String> body){
        String urlEncodedBody = createUrlEncodedString(body);
        HttpResponse<String> response = this.performRequest(RequestType.PUT, params, urlEncodedBody);
        String retval = response.body();

        JsonObject json = new JsonParser().parse(retval).getAsJsonObject();
        return json.get("result").getAsBoolean();
    }
    public Boolean delete(HashMap<String, String> params, HashMap<String, String> body){
        String urlEncodedBody = createUrlEncodedString(body);
        HttpResponse<String> response = this.performRequest(RequestType.DELETE, params, urlEncodedBody);
        String retval = response.body();

        JsonObject json = new JsonParser().parse(retval).getAsJsonObject();
        return json.get("result").getAsBoolean();    
    }
}
