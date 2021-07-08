package com.zs;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.nio.file.Path;
import java.util.function.Function;

import static java.nio.file.Files.readString;
import static java.util.Arrays.stream;
import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.toMap;

public class MyMeain {


    public static void main(String[] args) {
        String contactJsonFile = readString(Path.of("/Contact.json"));
        String userJsonFile = readString(Path.of(DUMP_PATH + "/User.json"));
        Gson gson = new GsonBuilder().setDateFormat(DATE_FORMAT).create();
        contactsByLegalEntityId = stream(gson.fromJson(contactJsonFile,
                ContactItem[].class)).collect(groupingBy(ContactItem::getLegalEntityId));

    }
}
