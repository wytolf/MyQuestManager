# Architectural Design Record - ADR

## History
| Version | Date | Description                                               |
|---------| --- |-----------------------------------------------------------|
| 0.1     |Februar 2024| Architekturentscheid in der Planungsphase                 |
| 0.2     |März 2024| Refactoring der Architektur, Entfernung des Auth-Services |
| 0.3     |Mai 2024| Entscheidung wurde hier dokumentiert                      |

## Kontext
Im Rahmen des Blockwochenmodul WEBLAB an der HSLU im Herbstsemester 2023 wurde der Auftrag erteilt, eine Webapplikation zu entwickeln. Daraus resultierte das vorliegende Softwaresystem EFTQuestManager. Dieses System soll es ermöglichen, Quests für das Spiel Escape from Tarkov zu erstellen und zu verwalten. Die Applikation soll parallel mehrere Nutzende zulassen und somit als Multiuserapplikation entwickelt werden.
Das Problem, das wir sehen und das diese Entscheidung oder Änderung motiviert, ist die Notwendigkeit, eine skalierbare und effiziente Lösung zu entwickeln, die mehrere Benutzer gleichzeitig unterstützt.

## Entscheidungen & Begründung
Es wurde entschieden, für das Backend eine Microservice-Architektur zu implementieren. Diese Entscheidung wurde getroffen, um die Skalierbarkeit und Effizienz der Anwendung zu verbessern und gleichzeitig die Komplexität und den Wartungsaufwand zu reduzieren.
Die verschiedenen Kontexte, welche vorhanden sind, beeinflussten die Entscheidung ebenso. Ao wurde entschieden, dass die Anwendung in folgende Microservices aufgeteilt wird:
- User-Service
- Quest-Service
- Gateway-Service
- Auth-Service (ursprünglich, wurde jedoch im März 2024 durch Refactoring entfernt)

Das Frontend wurde als Single Page Application (SPA) mit Angular entwickelt. Die Kommunikation zwischen Frontend und Backend erfolgt über REST-APIs.

## Konsequenzen
Die Entscheidung, eine Microservice-Architektur zu implementieren, hat mehrere Konsequenzen:
- Die Anwendung wird in mehrere unabhängige Services aufgeteilt, die jeweils für einen bestimmten Aspekt der Anwendung verantwortlich sind.
- Die Services kommunizieren über REST-APIs miteinander, um Daten auszutauschen.
- Die Anwendung wird in Docker-Containern bereitgestellt, um die Skalierbarkeit und Effizienz zu verbessern.

### Negative Auswirkungen
- Die Implementierung einer Microservice-Architektur erfordert zusätzliche Entwicklungs- und Wartungsaufwand.
- Der Datenfluss & Kontrollfluss wird im System schwer nachvollziehbar. (Ein Tracingsystem würde hier Abhilfe schaffen)
- Falls einer der Services ausfällt, kann dies zu einem Ausfall der gesamten Anwendung führen. Dies muss beachtet werden. (Resilienz)