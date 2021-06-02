package com.zs;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;

import javax.xml.bind.DatatypeConverter;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.List;
import java.util.function.Predicate;

@Aspect
public class AnonymizedAspect {

    private static final MessageDigest messageDigest = initMessageDigest();
    Predicate<JoinPoint> isInExportPhase = joinPoint -> Arrays.stream(joinPoint.getThis().getClass().getDeclaredFields())
            .filter(elt -> elt.getName().equalsIgnoreCase("exportPhase")).findFirst()
            .map(elt -> {
                elt.setAccessible(true);
                try {
                    return (boolean) elt.get(joinPoint.getThis());
                } catch (IllegalAccessException e) {
                    throw new IllegalStateException(e);
                }
            }).orElse(false);


    @Pointcut("execution(* (@com.zs.Anonymized *).*get*(..))")
    public void annotatedGetters() {
        // aspect pointcut in case you need to reuse it (using another beside around, before...)
    }

    @Around("annotatedGetters()")
    public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
         if (!isInExportPhase.test(joinPoint))
           return joinPoint.proceed();


        Anonymized annotation = joinPoint.getThis().getClass().getAnnotation(Anonymized.class);
        List<String> annotationFieldList = Arrays.asList(annotation.fields());


        String isAnonymizableField = annotationFieldList
                .stream()
                .filter(elt -> elt.equalsIgnoreCase(joinPoint.getSignature().getName().replace("get", "")))
                .findFirst().orElse(null);

        return isAnonymizableField != null ? anonymizeData(joinPoint.proceed().toString()) : joinPoint.proceed();
    }


    private String anonymizeData(String data) {
        messageDigest.update(data.getBytes());
        return DatatypeConverter.printHexBinary(messageDigest.digest());
    }

    private static MessageDigest initMessageDigest() {
        try {
            return MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException(e);
        }

    }


}
