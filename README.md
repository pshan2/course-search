#Course-Search Test Project

Created by Pengyin Shan, Aug 9th. This is a mock-up test project for Course-Search.

Office of Communications and Public Affairs, Emory University, 2016

###Update Aug 10th: Basic Strcutre of Course/CSV (Example row 3949)

- College

    -> Program

        -> Subject(Short Name)

            -> Course (Course Number)

                -> Section (Section Number):
                    - Title
                    - Format
                    - Credit
                    - Location
                    - Room
                    - Days
                    - Time
                    - Instrcutor
                    - Class Enroll Cap
                    - Class Enroll Total
                    - Class Wait Cap
                    - Class Wait Total
                    - Class Minimum Enroll
                    - Note

###Update Aug 15th: Rule for CVS Parsing

*In papaParse, use webworker to initialize array.*

Page is actively loading csv row-by-row, without block.

1. Row only incldes `_` means see next line

 - if line starts with `Report ID` Format, which means **change subject or program or college**.

 - else next line starts for a new `course`

2. If face `,` continue to read till next alphanumeric (or none `,` and none `_` value)

3. If full line is `,`, means next line starts `section` attributes. (`ReportId` is exception)

4. If face `()`, item in it means notes for a section

5. If face `:`, read till facing a `,`, means content of a attribute (`ReportId` is exception)