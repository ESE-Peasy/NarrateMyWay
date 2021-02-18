---
nav_order: 1
title: Location Encoding
parent: NMW Standard
---

<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.23/css/jquery.dataTables.min.css">
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.23/js/jquery.dataTables.min.js"></script>

# Location Encoding

[Click here to scroll to the table of codes](#22){: .btn }

## Outline

Part of the NarrateMyWay project is concerned with the development of a language agnostic method for encoding locations. This also needs to be done in efficient way as some beacon technologies are limiting in the length of data that can be advertised to devices. Location encodings should also be useable in an off-line manner so travelling to a new location doesn't require using mobile data. Further expansions can be made possible that could require further downloads.

To summarise, the fundamental points of importance are:

- Locations should be encoded in a way that is language agnostic
- The fundamental encoding should be static, i.e., not require mobile data functionality
  - Expansion encodings may require further downloads and be more dynamic
- The encoding should be compact

## Encoding Pattern

### 1. Hierarchical Encoding

The locations should be encoded in a hierarchical manner, with each level being more specific than the last.

An example location encoding could therefore be `1.42.0.0`.

#### 1.1.

A location code will consist of four fields.

#### 1.2.

The fields are of fixed sizes, but not all of the same size. The length of each field is as follows:

- Top-level category\\
    **Length**: 4 bits\\
    **Max. categories**: 16
- Subcategory\\
    **Length**: 7 bits\\
    **Max. categories**: 128
- Subsubcategory\\
    **Length**: 7 bits\\
    **Max. categories**: 128
- Customised location\\
    **Length**: 14 bits\\
    **Max. categories**: 16384


The location type encoding is therefore four bytes long in total.

#### 1.3

The first three fields are reserved by this standard, with the fourth field being unreserved. An organisation may release a customised mapping for codes in the fourth field. See [here (link TBC)]() for more information on how this works.

_[§2.1](21) is an exception to this_

#### 1.4.

Only the first field must be defined in any implementation of the standard. It may be that in some languages or cultures it does not make sense to have a translation at all levels of the hierarchy, but any localisation/regionalisation of the system should have translations for the top-level field.

#### 1.5.

When written as text, each field will be separated by a dot/period (`.`). Each field is written as a decimal number in the interval [0, Max. categories), where *max. categories* is defined in [§1.2](12).

### 2. Location Codes

This section documents specific codes and their meanings.

#### 2.1.

The top-level field code of zero is reserved for private usage. This allows a private network of beacons to be deployed that broadcast a code of `0.X.X.X`, where the meaning of fields is undefined in the standard and therefore not known by passers-by. This is the only case in which organisations may redefine any codes defined in this standard. It is not recommended for general usage as this reduces the effectiveness of the standard. It should only be used for private deployments where **all** potential users are able to download location code definitions for this custom deployment.

_This is an exception to [§1.3](#13)_

#### 2.2.

Incomplete
{: .label .label-yellow}

Locations are defined as in the following table. Note that these are English translations of the codes and so the meaning in some languages/cultures may not exist at all levels.

<table class="display">
<colgroup>
<col width="10%" />
<col width="90%" />
</colgroup>

<thead>
  <tr class="header">
    <th>Code</th>
    <th>Meaning</th>
  </tr>
</thead>

<tbody>
  <tr>
    <td markdown="span">**_1_**</td>
    <td markdown="span">**_General navigation markers_**</td>
  </tr>
  <tr>
    <td markdown="span">**1.0**</td>
    <td markdown="span">**Warnings/dangerous area**</td>
  </tr>
  <tr>
    <td markdown="span">1.0.0</td>
    <td markdown="span">General caution/warning</td>
  </tr>
  <tr>
    <td markdown="span">**1.1**</td>
    <td markdown="span">**Information point**</td>
  </tr>
  <tr>
    <td markdown="span">1.1.0</td>
    <td markdown="span">Visual-only navigation sign</td>
  </tr>
  <tr>
    <td markdown="span">1.1.1</td>
    <td markdown="span">Audio-accessible information point</td>
  </tr>
  <tr>
    <td markdown="span">**_2_**</td>
    <td markdown="span">**_Education_**</td>
  </tr>
  <tr>
    <td markdown="span">**2.0**</td>
    <td markdown="span">**Classrooms**</td>
  </tr>
  <tr>
    <td markdown="span">2.0.0</td>
    <td markdown="span">Classroom</td>
  </tr>
  <tr>
    <td markdown="span">2.0.1</td>
    <td markdown="span">Lecture theatre</td>
  </tr>
  <tr>
    <td markdown="span">**2.1**</td>
    <td markdown="span">**Practical rooms**</td>
  </tr>
  <tr>
    <td markdown="span">2.1.0</td>
    <td markdown="span">Workshop</td>
  </tr>
  <tr>
    <td markdown="span">2.1.1</td>
    <td markdown="span">Laboratory</td>
  </tr>
  <tr>
    <td markdown="span">**_3_**</td>
    <td markdown="span">**_Food/drink venues_**</td>
  </tr>
  <tr>
    <td markdown="span">**_4_**</td>
    <td markdown="span">**_Transport_**</td>
  </tr>
</tbody>
</table>

<script type="text/javascript">
$(document).ready( function () {
    $('table.display').DataTable();
} );
</script>
