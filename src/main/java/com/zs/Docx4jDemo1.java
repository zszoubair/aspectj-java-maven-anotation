package com.zs;

import org.docx4j.model.datastorage.migration.VariablePrepare;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.docx4j.openpackaging.parts.WordprocessingML.MainDocumentPart;

import java.io.*;
import java.util.HashMap;
import java.util.Map;

public class Docx4jDemo1 {

    public static void main(String[] args) {
        Map<String, String> data = new HashMap<>();
        data.put("classsalwa", "Two Classes in Three Years");
        data.put("total", "50");
        data.put("male", "30");
        data.put("female", "20");
        data.put("name", "Xiaoming");
        data.put("sex", "male");
        data.put("age", "10");
        data.put("phone", "13888888888");
        data.put("address", "China");
        data.put("email", "xiaoming@163.com");
        try {
            replaceData(data);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Load template and replace data
     *
     * @param data
     * @return
     * @throws Exception
     */
    public static void replaceData(Map<String, String> data) throws Exception {
        final String TEMPLATE_NAME = "/home/tinubu.local/zsaidi.ext/Téléchargements/Proposition de projet.docx";
        InputStream templateInputStream = new FileInputStream(TEMPLATE_NAME);
        // Load template file and create WordperocessingMLPackage object
        WordprocessingMLPackage wordMLPackage = WordprocessingMLPackage.load(templateInputStream);
        MainDocumentPart documentPart = wordMLPackage.getMainDocumentPart();
        VariablePrepare.prepare(wordMLPackage);
        documentPart.variableReplace(data);
        OutputStream os = new FileOutputStream(new File("/home/tinubu.local/zsaidi.ext/Téléchargements/result.docx"));
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        wordMLPackage.save(outputStream);
        outputStream.writeTo(os);
        os.close();
        outputStream.close();
        templateInputStream.close();
    }


}
