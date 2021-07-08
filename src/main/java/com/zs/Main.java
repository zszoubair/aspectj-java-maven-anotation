package com.zs;


import fr.opensagres.xdocreport.converter.ConverterTypeTo;
import fr.opensagres.xdocreport.converter.Options;
import fr.opensagres.xdocreport.core.XDocReportException;
import fr.opensagres.xdocreport.core.document.DocumentKind;
import fr.opensagres.xdocreport.document.IXDocReport;
import fr.opensagres.xdocreport.document.registry.XDocReportRegistry;
import fr.opensagres.xdocreport.template.IContext;
import fr.opensagres.xdocreport.template.TemplateEngineKind;

import java.io.*;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;

public class Main {
//    public static void main(String... args) throws XDocReportException, IOException {
////        IXDocReport report = XDocReportRegistry.getRegistry().loadReport(new FileInputStream("/home/tinubu.local/zsaidi.ext/Téléchargements/salwa.odt"),
////                TemplateEngineKind.Freemarker);
////        IContext context = report.createContext(); // create context
////
////
////
////
////
////        File actualOutputDoc = new File("/home/tinubu.local/zsaidi.ext/Téléchargements/salwresult.odt"); // init output doc file (result file)
////        report.process(context, new FileOutputStream(actualOutputDoc)); // launch the generation of the new doc
//
//        //Load ODT file and set the template engine to Freemarker
//        FileInputStream fileInputStream = new FileInputStream("/home/tinubu.local/zsaidi.ext/Téléchargements/testfinal.odt");
//        CustomerPojo cp = new CustomerPojo();
//        cp.setEmail("salwa@gmail.com");
//        cp.setName("name");
//        cp.setSurname("surname");
//
//
//
//
//
//
//
//        IXDocReport xdocGenerator = XDocReportRegistry.getRegistry().loadReport(fileInputStream, TemplateEngineKind.Freemarker);
//        IContext context = xdocGenerator.createContext();
//
//        context.put("customer", cp);
//        File actualOutputDoc = new File("/home/tinubu.local/zsaidi.ext/Téléchargements/salwresult.odt");
//        FileOutputStream fileOutputStream = new FileOutputStream(actualOutputDoc);
//        Options options = Options.getFrom(DocumentKind.ODT).to(ConverterTypeTo.PDF);
//
//        xdocGenerator.convert(context, options, fileOutputStream);
////        xdocGenerator.process(context,fileOutputStream);
//        fileInputStream.close();
//        fileOutputStream.close();
//    }



    public static void main(String[] args) {
        try {
            // 1) Load ODT file by filling Velocity template engine and cache
            // it to the registry
                String path="/home/tinubu.local/zsaidi.ext/Téléchargements/template/";
                InputStream in = new FileInputStream(path+"zs.odt");
            IXDocReport report = XDocReportRegistry.getRegistry().loadReport(
                    in, TemplateEngineKind.Freemarker);

            // 2) Create context Java model

            Example example = new Example();
            example.setRappel(Rappel.AUTRE_PROJET);
            IContext context = report.createContext();

            ArrayList<Section> sections = new ArrayList<>();
            sections.add(Section.DALLAGE);
            sections.add(Section.MITOYENNETE);
            sections.add(Section.VORIE);
            context.put("projects", Arrays.asList(getProject("project1"),getProject("PRoject2")));
            context.put("test", "foot");
            context.put("zoubair",example );
            context.put("sections",sections );
            context.put("zs",true );

            // 3) Generate report by merging Java model with the ODT
            OutputStream out = new FileOutputStream(new File(
                    "result.odt"));
            report.process(context, out);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (XDocReportException e) {
            e.printStackTrace();
        }
    }

    private static Project getProject(String pn) {
        Project project = new Project(pn);
        project.setTransactions(Arrays.asList("transaction1","Transaction2"));
        return project;
    }

}


