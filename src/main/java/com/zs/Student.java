package com.zs;

//@Anonymized(fields = {"lastName"})
@Anonymized(fields = {"firstName"})
class Student {
    private String lastName;
    private String firstName;
    private boolean exportPhase;

    public Student(String lastName, String firstName) {
        this.lastName = lastName;
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public boolean isExportPhase() {
        return exportPhase;
    }

    public void setExportPhase(boolean exportPhase) {
        this.exportPhase = exportPhase;
    }
}

