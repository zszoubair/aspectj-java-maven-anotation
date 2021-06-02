# aspectj java maven annotation Anonymized
<p>a mini project with aspectj imported and configured using maven and java 8</p> 
<p>adding a custom annotation `Anonymized` that allows the anonymization of a specific field of a pojo
<br>
applying the annotation on a class's specific field level using target ElementType.TYPE
specified on the fields attribute value (as a String array)
</p>

** Check  `Student class's`  annotation field ;) **

`By ZS` 

### Run ###
```
mvn compile exec:java
```

### Create executable jar with dependencies ###
```
mvn package assembly:single
```

