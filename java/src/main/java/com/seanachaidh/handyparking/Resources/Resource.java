package com.seanachaidh.handyparking.Resources;

import java.io.InputStream;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpRequest.Builder;
import java.util.HashMap;
import java.util.Map.Entry;

import java.net.URL;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

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

        for (Entry<String, String> e : parameters.entrySet()) {
            String to_search = "{" + e.getKey() + "}";
            url = url.replace(to_search, e.getValue());
        }
        return url;
    }

    public HttpResponse<String> performRequest(RequestType t, String postbody){
        try {
            URL fullurl = new URL(this.getFullURL());
            HttpClient client = HttpClient.newHttpClient();
            Builder b = HttpRequest.newBuilder(fullurl.toURI());
            HttpRequest request;
            switch (t) {
                case GET:
                    request = b.GET().build();
                case POST:
                    request = b.POST(BodyPublishers.ofString(postbody)).build();
                case PUT:
                    request = b.PUT(BodyPublishers.ofString(postbody)).build();
                case DELETE:
                    request = b.DELETE().build();
                default:
                    break;
            }
            return client.send(request, HttpResponse.BodyHandlers.ofString());
        } catch(Exception e) {
            e.printStackTrace();
        }
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

    public Resource(final String restURL) {
        this.restURL = restURL;
        parseConfiguration();
    }
    
    public abstract RESTResult get(HashMap<String, String> params, HashMap<String, String> body);
    public abstract RESTResult post(HashMap<String, String> params, HashMap<String, String> body);
    public abstract RESTResult put(HashMap<String, String> params, HashMap<String, String> body);
    public abstract RESTResult patch(HashMap<String, String> params, HashMap<String, String> body);
    public abstract RESTResult delete(HashMap<String, String> params, HashMap<String, String> body);
}
