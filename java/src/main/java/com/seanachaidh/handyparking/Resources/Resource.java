package com.seanachaidh.handyparking.Resources;

import java.io.InputStream;
import java.util.HashMap;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public abstract class Resource {
    private final String restURL;
    private String rooturl;

    public String getRestURL() {
        return restURL;
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
