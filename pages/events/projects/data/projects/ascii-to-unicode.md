#### Document conversion ASCII fonts to Unicode

##### Description
There are still a lot of documents and contents written in legacy ASCII-like encoded fonts in many parts of the world. The Indian region widely suffers from this. The publishing industry academics and many others often use online text  converters to convert the documents from ASCII encoding to Unicode. These online converters does the simple task of converting the ASCII encoded character sequences to corresponding Unicode characters for that script. But the problem is that;

- Documents formatting is lost during the copy paste process 
- Contents inside tables and other graphs should be copied back and forth manually
- Batch processing is not possible
- For each language there are multiple font encodings and mappings

##### Solution
- An open source conversion tool  for OpenDocumentFormat documents such as ott and odp
> Open document format is widely supported and documented with interoperability. Combination with other document conversion libraries (ie:Pandoc) this tool can support a wide range of documents including Microsoft Office document formats.

- A web based tool should be implemented 
- A XML schema to store mappings for each ASCII like encodings
- A library of mappings for each language

The online conversion tools for languages like Hindi, Kannada and other languages are used by many on a day today basis in digital publishing. Many Indian language publishers still use legacy fonts for their print publishing workflows and when they have to publish for web, they painstakingly go through the the process of copying and pasting text between the tools and reformatting. There are piles of documents in government institutions encoded in legacy fonts and this tool will ensure that an open tool is available for wider use and that legacy fonts and encodings are documented and archived.

##### Deliverables

- Single paged web application
- NPM package for ASCII conversions
- Node.js REST API
