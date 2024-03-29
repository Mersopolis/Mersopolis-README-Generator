// Imports and defines call for Inquirer
const inquirer = require("inquirer");
// Imports file system and defines WriteFile function call
const fs = require("fs");
const { writeFile } = require('fs').promises;

// Defines prompts array for inquirer
const prompts = [
  // Project name
  {
    type: "input",
    name: "project",
    message: "Write the name of the project. (Then press Enter to go to the next step)\n",
  },
  // Description
  {
    type: "input",
    name: "desc",
    message: "Write a short description of the project. (Remember to use <br/> to start a new line instead of pressing Enter)\n",
  },
  // Installation Instructions
  {
    type: "input",
    name: "install",
    message: "Write installation instructions for the project.\n",
  },
  // Usage Instructions
  {
    type: "input",
    name: "usage",
    message: "Write instructions for using the project.\n",
  },
  // Testing Instructions
  {
    type: "input",
    name: "tests",
    message: "Write instructions for testing the project.\n",
  },
  // GitHub
  {
    type: "input",
    name: "github",
    message: "Write the name of the GitHub profile that owns the project. (Note: This is case-sensitive)\n",
  },
  // Email
  {
    type: "input",
    name: "email",
    message: "Write the email address that users should direct questions to.\n",
  },
  // Contribution Guidelines
  {
    type: "input",
    name: "contributing",
    message: "Write guidelines for contributing to the project.\n",
  },
  // Credits
  {
    type: "input",
    name: "credits",
    message: "Write the names of the people and/or organizations who worked on this project as well as what third party assets were used.\n",
  },
  // License
  {
    type: "list",
    name: "license",
    message: "Choose the license for the project. (Note: Some licenses require additional input. Be sure to check the license for such.)\n",
    choices: [
      "The Unlicense",
      "Boost Software License 1.0",
      "MIT License",
      "Apache License 2.0",
      "Mozilla Public License 2.0",
      "GNU GPLv3"
    ], 
  }
];

// Defines promptQuestions function
const promptQuestions = () => {
  // Runs Inquirer with previously defined prompts
  return inquirer.prompt(prompts)
};

// Declares variables for following function in global scope
var license;
var licensing;

// Defines licenseSelect function
const licenseSelect = (input) => {
  // Variables previously declared are defined based on input
  license = input.license;
  badge = input.badge;
  // Switch operation that checks license variable
  switch (license) {
    // When license is The Unlicense
    case "The Unlicense": {
      // licensing variable defined as object containing markdown-formatted license and badge
      licensing = {
        license: 
`This is free and unencumbered software released into the public domain.\n
Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means.\n
In jurisdictions that recognize copyright laws, the author or authors of this software dedicate any and all copyright interest in the software to the public domain. We make this dedication for the benefit of the public at large and to the detriment of our heirs and successors. We intend this dedication to be an overt act of relinquishment in perpetuity of all present and future rights to this software under copyright law.\n
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n
For more information, please refer to <https://unlicense.org>
`,
      badge: "![The Unlicense](https://img.shields.io/badge/license-The%20Unlicense-green)"
      }
      // licensing object replaces license and badge properties in input
      input = {...input, ...licensing};
      // Modified input is passed through
      return input;
    }
    case "Boost Software License 1.0": {
      licensing = {
        license: 
`Boost Software License - Version 1.0 - August 17th, 2003\n
Permission is hereby granted, free of charge, to any person or organization obtaining a copy of the software and accompanying documentation covered by this license (the "Software") to use, reproduce, display, distribute, execute, and transmit the Software, and to prepare derivative works of the Software, and to permit third-parties to whom the Software is furnished to do so, all subject to the following:\n
The copyright notices in the Software and this entire statement, including the above license grant, this restriction and the following disclaimer, must be included in all copies of the Software, in whole or in part, and all derivative works of the Software, unless such copies or derivative works are solely in the form of machine-executable object code generated by a source language processor.\n
THE SOFTWARE IS PROVIDED "AS IS", WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE COPYRIGHT HOLDERS OR ANYONE DISTRIBUTING THE SOFTWARE BE LIABLE FOR ANY DAMAGES OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
`,
      badge: "![Boost Software License 1.0](https://img.shields.io/badge/license-Boost%20Software%20License%201.0-green)"
      }
      input = {...input, ...licensing};
      return input;
    }
    case "MIT License": {
      licensing = {
        license: 
`MIT License\n
Copyright (c) [year] [fullname]\n      
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
`,
        badge: "![MIT License](https://img.shields.io/badge/license-MIT%20License-green)"
      }
      input = {...input, ...licensing};
      return input;
    }
    case "Apache License 2.0": {
      licensing = {
        license: 
`Apache License\n
Version 2.0, January 2004\n
http://www.apache.org/licenses/\n
TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION\n
1. Definitions.\n
"License" shall mean the terms and conditions for use, reproduction, and distribution as defined by Sections 1 through 9 of this document.\n
"Licensor" shall mean the copyright owner or entity authorized by the copyright owner that is granting the License.\n
"Legal Entity" shall mean the union of the acting entity and all other entities that control, are controlled by, or are under common control with that entity. For the purposes of this definition, "control" means (i) the power, direct or indirect, to cause the direction or management of such entity, whether by contract or otherwise, or (ii) ownership of fifty percent (50%) or more of the outstanding shares, or (iii) beneficial ownership of such entity.\n
"You" (or "Your") shall mean an individual or Legal Entity exercising permissions granted by this License.\n
"Source" form shall mean the preferred form for making modifications, including but not limited to software source code, documentation source, and configuration files.\n
"Object" form shall mean any form resulting from mechanical transformation or translation of a Source form, including but not limited to compiled object code, generated documentation, and conversions to other media types.\n
"Work" shall mean the work of authorship, whether in Source or Object form, made available under the License, as indicated by a copyright notice that is included in or attached to the work (an example is provided in the Appendix below).\n
"Derivative Works" shall mean any work, whether in Source or Object form, that is based on (or derived from) the Work and for which the editorial revisions, annotations, elaborations, or other represent, as a whole, an original work of authorship. For the purposes of this License, Derivative Works shall not include works that remain separable from, or merely link (or bind by name) to the interfaces of, the Work and Derivative Works thereof.\n
"Contribution" shall mean any work of authorship, including the original version of the Work and any modifications or additions to that Work or Derivative Works thereof, that is intentionally submitted to Licensor for inclusion in the Work by the copyright owner or by an individual or Legal Entity authorized to submit on behalf of the copyright owner. For the purposes of this definition, "submitted" means any form of electronic, verbal, or written communication sent to the Licensor or its representatives, including but not limited to communication on electronic mailing lists, source code control systems, and issue tracking systems that are managed by, or on behalf of, the Licensor for the purpose of discussing and improving the Work, but excluding communication that is conspicuously marked or otherwise designated in writing by the copyright owner as "Not a Contribution."\n
"Contributor" shall mean Licensor and any individual or Legal Entity on behalf of whom a Contribution has been received by Licensor and subsequently incorporated within the Work.\n
2. Grant of Copyright License. Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable copyright license to reproduce, prepare Derivative Works of, publicly display, publicly perform, sublicense, and distribute the Work and such Derivative Works in Source or Object form.\n
3. Grant of Patent License. Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable (except as stated in this section) patent license to make, have, use, offer to sell, sell, import, and otherwise transfer the Work, where such license applies only to those patent claims licensable by such Contributor that are necessarily infringed by their Contribution(s) alone or by combination of their Contribution(s) with the Work to which such Contribution(s) was submitted. If You institute patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Work or a Contribution incorporated within the Work constitutes direct or contributory patent infringement, then any patent licenses granted to You under this License for that Work shall terminate as of the date such litigation is filed.\n
4. Redistribution. You may reproduce and distribute copies of the Work or Derivative Works thereof in any medium, with or without modifications, and in Source or Object form, provided that You meet the following conditions:\n
(a) You must give any other recipients of the Work or Derivative Works a copy of this License; and\n
(b) You must cause any modified files to carry prominent notices stating that You changed the files; and\n
(d) If the Work includes a "NOTICE" text file as part of its distribution, then any Derivative Works that You distribute must include a readable copy of the attribution notices contained within such NOTICE file, excluding those notices that do not pertain to any part of the Derivative Works, in at least one of the following places: within a NOTICE text file distributed as part of the Derivative Works; within the Source form or documentation, if provided along with the Derivative Works; or, within a display generated by the Derivative Works, if and wherever such third-party notices normally appear. The contents of the NOTICE file are for informational purposes only and do not modify the License. You may add Your own attribution notices within Derivative Works that You distribute, alongside or as an addendum to the NOTICE text from the Work, provided that such additional attribution notices cannot be construed as modifying the License.\n
You may add Your own copyright statement to Your modifications and may provide additional or different license terms and conditions for use, reproduction, or distribution of Your modifications, or for any such Derivative Works as a whole, provided Your use, reproduction, and distribution of the Work otherwise complies with the conditions stated in this License.\n
5. Submission of Contributions. Unless You explicitly state otherwise, any Contribution intentionally submitted for inclusion in the Work by You to the Licensor shall be under the terms and conditions of this License, without any additional terms or conditions. Notwithstanding the above, nothing herein shall supersede or modify the terms of any separate license agreement you may have executed with Licensor regarding such Contributions.\n
6. Trademarks. This License does not grant permission to use the trade names, trademarks, service marks, or product names of the Licensor, except as required for reasonable and customary use in describing the origin of the Work and reproducing the content of the NOTICE file.\n
7. Disclaimer of Warranty. Unless required by applicable law or agreed to in writing, Licensor provides the Work (and each Contributor provides its Contributions) on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied, including, without limitation, any warranties or conditions of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A PARTICULAR PURPOSE. You are solely responsible for determining the appropriateness of using or redistributing the Work and assume any risks associated with Your exercise of permissions under this License.\n
8. Limitation of Liability. In no event and under no legal theory, whether in tort (including negligence), contract, or otherwise, unless required by applicable law (such as deliberate and grossly negligent acts) or agreed to in writing, shall any Contributor be liable to You for damages, including any direct, indirect, special, incidental, or consequential damages of any character arising as a result of this License or out of the use or inability to use the Work (including but not limited to damages for loss of goodwill, work stoppage, computer failure or malfunction, or any and all other commercial damages or losses), even if such Contributor has been advised of the possibility of such damages.\n
9. Accepting Warranty or Additional Liability. While redistributing the Work or Derivative Works thereof, You may choose to offer, and charge a fee for, acceptance of support, warranty, indemnity, or other liability obligations and/or rights consistent with this License. However, in accepting such obligations, You may act only on Your own behalf and on Your sole responsibility, not on behalf of any other Contributor, and only if You agree to indemnify, defend, and hold each Contributor harmless for any liability incurred by, or claims asserted against, such Contributor by reason of your accepting any such warranty or additional liability.\n
END OF TERMS AND CONDITIONS\n
APPENDIX: How to apply the Apache License to your work.\n
To apply the Apache License to your work, attach the following boilerplate notice, with the fields enclosed by brackets "[]" replaced with your own identifying information. (Don't include the brackets!)  The text should be enclosed in the appropriate comment syntax for the file format. We also recommend that a file or class name and description of purpose be included on the same "printed page" as the copyright notice for easier identification within third-party archives.\n
Copyright [yyyy] [name of copyright owner]\n
Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at\n
http://www.apache.org/licenses/LICENSE-2.0\n
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
`,
        badge: "![Apache License 2.0](https://img.shields.io/badge/license-Apache%20License%202.0-green)"}
      input = {...input, ...licensing};
      return input;
    }
    case "Mozilla Public License 2.0": {
      licensing = {
        license: 
`Mozilla Public License Version 2.0\n
==================================\n
\n
1. Definitions\n
--------------\n
\n
1.1. "Contributor"\n
    means each individual or legal entity that creates, contributes to\n
    the creation of, or owns Covered Software.\n
\n
1.2. "Contributor Version"\n
    means the combination of the Contributions of others (if any) used\n
    by a Contributor and that particular Contributor's Contribution.\n
\n
1.3. "Contribution"\n
    means Covered Software of a particular Contributor.\n
\n
1.4. "Covered Software"\n
    means Source Code Form to which the initial Contributor has attached\n
    the notice in Exhibit A, the Executable Form of such Source Code\n
    Form, and Modifications of such Source Code Form, in each case\n
    including portions thereof.\n
\n
1.5. "Incompatible With Secondary Licenses"\n
    means\n
\n
    (a) that the initial Contributor has attached the notice described\n
        in Exhibit B to the Covered Software; or\n
\n
    (b) that the Covered Software was made available under the terms of\n
        version 1.1 or earlier of the License, but not also under the\n
        terms of a Secondary License.\n
\n
1.6. "Executable Form"\n
    means any form of the work other than Source Code Form.\n
\n
1.7. "Larger Work"\n
    means a work that combines Covered Software with other material, in\n
    a separate file or files, that is not Covered Software.\n
\n
1.8. "License"\n
    means this document.\n
\n
1.9. "Licensable"\n
    means having the right to grant, to the maximum extent possible,\n
    whether at the time of the initial grant or subsequently, any and\n
    all of the rights conveyed by this License.\n
\n
1.10. "Modifications"\n
    means any of the following:\n
\n
    (a) any file in Source Code Form that results from an addition to,\n
        deletion from, or modification of the contents of Covered\n
        Software; or\n
\n
    (b) any new file in Source Code Form that contains any Covered\n
        Software.\n
\n
1.11. "Patent Claims" of a Contributor\n
    means any patent claim(s), including without limitation, method,\n
    process, and apparatus claims, in any patent Licensable by such\n
    Contributor that would be infringed, but for the grant of the\n
    License, by the making, using, selling, offering for sale, having\n
    made, import, or transfer of either its Contributions or its\n
    Contributor Version.\n
\n
1.12. "Secondary License"\n
    means either the GNU General Public License, Version 2.0, the GNU\n
    Lesser General Public License, Version 2.1, the GNU Affero General\n
    Public License, Version 3.0, or any later versions of those\n
    licenses.\n
\n
1.13. "Source Code Form"\n
    means the form of the work preferred for making modifications.\n
\n
1.14. "You" (or "Your")\n
    means an individual or a legal entity exercising rights under this\n
    License. For legal entities, "You" includes any entity that\n
    controls, is controlled by, or is under common control with You. For\n
    purposes of this definition, "control" means (a) the power, direct\n
    or indirect, to cause the direction or management of such entity,\n
    whether by contract or otherwise, or (b) ownership of more than\n
    fifty percent (50%) of the outstanding shares or beneficial\n
    ownership of such entity.\n
\n
2. License Grants and Conditions\n
--------------------------------\n
\n
2.1. Grants\n
\n
Each Contributor hereby grants You a world-wide, royalty-free,\n
non-exclusive license:\n
\n
(a) under intellectual property rights (other than patent or trademark)\n
    Licensable by such Contributor to use, reproduce, make available,\n
    modify, display, perform, distribute, and otherwise exploit its\n
    Contributions, either on an unmodified basis, with Modifications, or\n
    as part of a Larger Work; and\n
\n
(b) under Patent Claims of such Contributor to make, use, sell, offer\n
    for sale, have made, import, and otherwise transfer either its\n
    Contributions or its Contributor Version.\n
\n
2.2. Effective Date\n
\n
The licenses granted in Section 2.1 with respect to any Contribution\n
become effective for each Contribution on the date the Contributor first\n
distributes such Contribution.\n
\n
2.3. Limitations on Grant Scope\n
\n
The licenses granted in this Section 2 are the only rights granted under\n
this License. No additional rights or licenses will be implied from the\n
distribution or licensing of Covered Software under this License.\n
Notwithstanding Section 2.1(b) above, no patent license is granted by a\n
Contributor:\n
\n
(a) for any code that a Contributor has removed from Covered Software;\n
    or\n
\n
(b) for infringements caused by: (i) Your and any other third party's\n
    modifications of Covered Software, or (ii) the combination of its\n
    Contributions with other software (except as part of its Contributor\n
    Version); or\n
\n
(c) under Patent Claims infringed by Covered Software in the absence of\n
    its Contributions.\n
\n
This License does not grant any rights in the trademarks, service marks,\n
or logos of any Contributor (except as may be necessary to comply with\n
the notice requirements in Section 3.4).\n
\n
2.4. Subsequent Licenses\n
\n
No Contributor makes additional grants as a result of Your choice to\n
distribute the Covered Software under a subsequent version of this\n
License (see Section 10.2) or under the terms of a Secondary License (if\n
permitted under the terms of Section 3.3).\n
\n
2.5. Representation\n
\n
Each Contributor represents that the Contributor believes its\n
Contributions are its original creation(s) or it has sufficient rights\n
to grant the rights to its Contributions conveyed by this License.\n
\n
2.6. Fair Use\n
\n
This License is not intended to limit any rights You have under\n
applicable copyright doctrines of fair use, fair dealing, or other\n
equivalents.\n
\n
2.7. Conditions\n
\n
Sections 3.1, 3.2, 3.3, and 3.4 are conditions of the licenses granted\n
in Section 2.1.\n
\n
3. Responsibilities\n
-------------------\n
\n
3.1. Distribution of Source Form\n
\n
All distribution of Covered Software in Source Code Form, including any\n
Modifications that You create or to which You contribute, must be under\n
the terms of this License. You must inform recipients that the Source\n
Code Form of the Covered Software is governed by the terms of this\n
License, and how they can obtain a copy of this License. You may not\n
attempt to alter or restrict the recipients' rights in the Source Code\n
Form.\n
\n
3.2. Distribution of Executable Form\n
\n
If You distribute Covered Software in Executable Form then:\n
\n
(a) such Covered Software must also be made available in Source Code\n
    Form, as described in Section 3.1, and You must inform recipients of\n
    the Executable Form how they can obtain a copy of such Source Code\n
    Form by reasonable means in a timely manner, at a charge no more\n
    than the cost of distribution to the recipient; and\n
\n
(b) You may distribute such Executable Form under the terms of this\n
    License, or sublicense it under different terms, provided that the\n
    license for the Executable Form does not attempt to limit or alter\n
    the recipients' rights in the Source Code Form under this License.\n
\n
3.3. Distribution of a Larger Work\n
\n
You may create and distribute a Larger Work under terms of Your choice,\n
provided that You also comply with the requirements of this License for\n
the Covered Software. If the Larger Work is a combination of Covered\n
Software with a work governed by one or more Secondary Licenses, and the\n
Covered Software is not Incompatible With Secondary Licenses, this\n
License permits You to additionally distribute such Covered Software\n
under the terms of such Secondary License(s), so that the recipient of\n
the Larger Work may, at their option, further distribute the Covered\n
Software under the terms of either this License or such Secondary\n
License(s).\n
\n
3.4. Notices\n
\n
You may not remove or alter the substance of any license notices\n
(including copyright notices, patent notices, disclaimers of warranty,\n
or limitations of liability) contained within the Source Code Form of\n
the Covered Software, except that You may alter any license notices to\n
the extent required to remedy known factual inaccuracies.\n
\n
3.5. Application of Additional Terms\n
\n
You may choose to offer, and to charge a fee for, warranty, support,\n
indemnity or liability obligations to one or more recipients of Covered\n
Software. However, You may do so only on Your own behalf, and not on\n
behalf of any Contributor. You must make it absolutely clear that any\n
such warranty, support, indemnity, or liability obligation is offered by\n
You alone, and You hereby agree to indemnify every Contributor for any\n
liability incurred by such Contributor as a result of warranty, support,\n
indemnity or liability terms You offer. You may include additional\n
disclaimers of warranty and limitations of liability specific to any\n
jurisdiction.\n
\n
4. Inability to Comply Due to Statute or Regulation\n
---------------------------------------------------\n
\n
If it is impossible for You to comply with any of the terms of this\n
License with respect to some or all of the Covered Software due to\n
statute, judicial order, or regulation then You must: (a) comply with\n
the terms of this License to the maximum extent possible; and (b)\n
describe the limitations and the code they affect. Such description must\n
be placed in a text file included with all distributions of the Covered\n
Software under this License. Except to the extent prohibited by statute\n
or regulation, such description must be sufficiently detailed for a\n
recipient of ordinary skill to be able to understand it.\n
\n
5. Termination\n
--------------\n
\n
5.1. The rights granted under this License will terminate automatically\n
if You fail to comply with any of its terms. However, if You become\n
compliant, then the rights granted under this License from a particular\n
Contributor are reinstated (a) provisionally, unless and until such\n
Contributor explicitly and finally terminates Your grants, and (b) on an\n
ongoing basis, if such Contributor fails to notify You of the\n
non-compliance by some reasonable means prior to 60 days after You have\n
come back into compliance. Moreover, Your grants from a particular\n
Contributor are reinstated on an ongoing basis if such Contributor\n
notifies You of the non-compliance by some reasonable means, this is the\n
first time You have received notice of non-compliance with this License\n
from such Contributor, and You become compliant prior to 30 days after\n
Your receipt of the notice.\n
\n
5.2. If You initiate litigation against any entity by asserting a patent\n
infringement claim (excluding declaratory judgment actions,\n
counter-claims, and cross-claims) alleging that a Contributor Version\n
directly or indirectly infringes any patent, then the rights granted to\n
You by any and all Contributors for the Covered Software under Section\n
2.1 of this License shall terminate.\n
\n
5.3. In the event of termination under Sections 5.1 or 5.2 above, all\n
end user license agreements (excluding distributors and resellers) which\n
have been validly granted by You or Your distributors under this License\n
prior to termination shall survive termination.\n
\n
************************************************************************\n
*                                                                      *\n
*  6. Disclaimer of Warranty                                           *\n
*  -------------------------                                           *\n
*                                                                      *\n
*  Covered Software is provided under this License on an "as is"       *\n
*  basis, without warranty of any kind, either expressed, implied, or  *\n
*  statutory, including, without limitation, warranties that the       *\n
*  Covered Software is free of defects, merchantable, fit for a        *\n
*  particular purpose or non-infringing. The entire risk as to the     *\n
*  quality and performance of the Covered Software is with You.        *\n
*  Should any Covered Software prove defective in any respect, You     *\n
*  (not any Contributor) assume the cost of any necessary servicing,   *\n
*  repair, or correction. This disclaimer of warranty constitutes an   *\n
*  essential part of this License. No use of any Covered Software is   *\n
*  authorized under this License except under this disclaimer.         *\n
*                                                                      *\n
************************************************************************\n
\n
************************************************************************\n
*                                                                      *\n
*  7. Limitation of Liability                                          *\n
*  --------------------------                                          *\n
*                                                                      *\n
*  Under no circumstances and under no legal theory, whether tort      *\n
*  (including negligence), contract, or otherwise, shall any           *\n
*  Contributor, or anyone who distributes Covered Software as          *\n
*  permitted above, be liable to You for any direct, indirect,         *\n
*  special, incidental, or consequential damages of any character      *\n
*  including, without limitation, damages for lost profits, loss of    *\n
*  goodwill, work stoppage, computer failure or malfunction, or any    *\n
*  and all other commercial damages or losses, even if such party      *\n
*  shall have been informed of the possibility of such damages. This   *\n
*  limitation of liability shall not apply to liability for death or   *\n
*  personal injury resulting from such party's negligence to the       *\n
*  extent applicable law prohibits such limitation. Some               *\n
*  jurisdictions do not allow the exclusion or limitation of           *\n
*  incidental or consequential damages, so this exclusion and          *\n
*  limitation may not apply to You.                                    *\n
*                                                                      *\n
************************************************************************\n
\n
8. Litigation\n
-------------\n
\n
Any litigation relating to this License may be brought only in the\n
courts of a jurisdiction where the defendant maintains its principal\n
place of business and such litigation shall be governed by laws of that\n
jurisdiction, without reference to its conflict-of-law provisions.\n
Nothing in this Section shall prevent a party's ability to bring\n
cross-claims or counter-claims.\n
\n
9. Miscellaneous\n
----------------\n
\n
This License represents the complete agreement concerning the subject\n
matter hereof. If any provision of this License is held to be\n
unenforceable, such provision shall be reformed only to the extent\n
necessary to make it enforceable. Any law or regulation which provides\n
that the language of a contract shall be construed against the drafter\n
shall not be used to construe this License against a Contributor.\n
\n
10. Versions of the License\n
---------------------------\n
\n
10.1. New Versions\n
\n
Mozilla Foundation is the license steward. Except as provided in Section\n
10.3, no one other than the license steward has the right to modify or\n
publish new versions of this License. Each version will be given a\n
distinguishing version number.\n
\n
10.2. Effect of New Versions\n
\n
You may distribute the Covered Software under the terms of the version\n
of the License under which You originally received the Covered Software,\n
or under the terms of any subsequent version published by the license\n
steward.\n
\n
10.3. Modified Versions\n
\n
If you create software not governed by this License, and you want to\n
create a new license for such software, you may create and use a\n
modified version of this License if you rename the license and remove\n
any references to the name of the license steward (except to note that\n
such modified license differs from this License).\n
\n
10.4. Distributing Source Code Form that is Incompatible With Secondary\n
Licenses\n
\n
If You choose to distribute Source Code Form that is Incompatible With\n
Secondary Licenses under the terms of this version of the License, the\n
notice described in Exhibit B of this License must be attached.\n
\n
Exhibit A - Source Code Form License Notice\n
-------------------------------------------\n
\n
  This Source Code Form is subject to the terms of the Mozilla Public\n
  License, v. 2.0. If a copy of the MPL was not distributed with this\n
  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n
\n
If it is not possible or desirable to put the notice in a particular\n
file, then You may include the notice in a location (such as a LICENSE\n
file in a relevant directory) where a recipient would be likely to look\n
for such a notice.\n
\n
You may add additional accurate notices of copyright ownership.\n
\n
Exhibit B - "Incompatible With Secondary Licenses" Notice\n
---------------------------------------------------------\n
\n
  This Source Code Form is "Incompatible With Secondary Licenses", as\n
  defined by the Mozilla Public License, v. 2.0.
`,
        badge: "![Mozilla Public License 2.0](https://img.shields.io/badge/license-Mozilla%20Public%20License%202.0-green)"
      }
      input = {...input, ...licensing};
      return input;
    }
    case "GNU GPLv3": {
      licensing = {
        license: 
`GNU GENERAL PUBLIC LICENSE\n
Version 3, 29 June 2007\n
\n
Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>\n
Everyone is permitted to copy and distribute verbatim copies\n
of this license document, but changing it is not allowed.\n
\n
          Preamble\n
\n
The GNU General Public License is a free, copyleft license for\n
software and other kinds of works.\n
\n
The licenses for most software and other practical works are designed\n
to take away your freedom to share and change the works.  By contrast,\n
the GNU General Public License is intended to guarantee your freedom to\n
share and change all versions of a program--to make sure it remains free\n
software for all its users.  We, the Free Software Foundation, use the\n
GNU General Public License for most of our software; it applies also to\n
any other work released this way by its authors.  You can apply it to\n
your programs, too.\n
\n
When we speak of free software, we are referring to freedom, not\n
price.  Our General Public Licenses are designed to make sure that you\n
have the freedom to distribute copies of free software (and charge for\n
them if you wish), that you receive source code or can get it if you\n
want it, that you can change the software or use pieces of it in new\n
free programs, and that you know you can do these things.\n
\n
To protect your rights, we need to prevent others from denying you\n
these rights or asking you to surrender the rights.  Therefore, you have\n
certain responsibilities if you distribute copies of the software, or if\n
you modify it: responsibilities to respect the freedom of others.\n
\n
For example, if you distribute copies of such a program, whether\n
gratis or for a fee, you must pass on to the recipients the same\n
freedoms that you received.  You must make sure that they, too, receive\n
or can get the source code.  And you must show them these terms so they\n
know their rights.\n
\n
Developers that use the GNU GPL protect your rights with two steps:\n
(1) assert copyright on the software, and (2) offer you this License\n
giving you legal permission to copy, distribute and/or modify it.\n
\n
For the developers' and authors' protection, the GPL clearly explains\n
that there is no warranty for this free software.  For both users' and\n
authors' sake, the GPL requires that modified versions be marked as\n
changed, so that their problems will not be attributed erroneously to\n
authors of previous versions.\n
\n
Some devices are designed to deny users access to install or run\n
modified versions of the software inside them, although the manufacturer\n
can do so.  This is fundamentally incompatible with the aim of\n
protecting users' freedom to change the software.  The systematic\n
pattern of such abuse occurs in the area of products for individuals to\n
use, which is precisely where it is most unacceptable.  Therefore, we\n
have designed this version of the GPL to prohibit the practice for those\n
products.  If such problems arise substantially in other domains, we\n
stand ready to extend this provision to those domains in future versions\n
of the GPL, as needed to protect the freedom of users.\n
\n
Finally, every program is threatened constantly by software patents.\n
States should not allow patents to restrict development and use of\n
software on general-purpose computers, but in those that do, we wish to\n
avoid the special danger that patents applied to a free program could\n
make it effectively proprietary.  To prevent this, the GPL assures that\n
patents cannot be used to render the program non-free.\n
\n
The precise terms and conditions for copying, distribution and\n
modification follow.\n
\n
      TERMS AND CONDITIONS\n
\n
0. Definitions.\n
\n
"This License" refers to version 3 of the GNU General Public License.\n
\n
"Copyright" also means copyright-like laws that apply to other kinds of\n
works, such as semiconductor masks.\n
\n
"The Program" refers to any copyrightable work licensed under this\n
License.  Each licensee is addressed as "you".  "Licensees" and\n
"recipients" may be individuals or organizations.\n
\n
To "modify" a work means to copy from or adapt all or part of the work\n
in a fashion requiring copyright permission, other than the making of an\n
exact copy.  The resulting work is called a "modified version" of the\n
earlier work or a work "based on" the earlier work.\n
\n
A "covered work" means either the unmodified Program or a work based\n
on the Program.\n
\n
To "propagate" a work means to do anything with it that, without\n
permission, would make you directly or secondarily liable for\n
infringement under applicable copyright law, except executing it on a\n
computer or modifying a private copy.  Propagation includes copying,\n
distribution (with or without modification), making available to the\n
public, and in some countries other activities as well.\n
\n
To "convey" a work means any kind of propagation that enables other\n
parties to make or receive copies.  Mere interaction with a user through\n
a computer network, with no transfer of a copy, is not conveying.\n
\n
An interactive user interface displays "Appropriate Legal Notices"\n
to the extent that it includes a convenient and prominently visible\n
feature that (1) displays an appropriate copyright notice, and (2)\n
tells the user that there is no warranty for the work (except to the\n
extent that warranties are provided), that licensees may convey the\n
work under this License, and how to view a copy of this License.  If\n
the interface presents a list of user commands or options, such as a\n
menu, a prominent item in the list meets this criterion.\n
\n
1. Source Code.\n
\n
The "source code" for a work means the preferred form of the work\n
for making modifications to it.  "Object code" means any non-source\n
form of a work.\n
\n
A "Standard Interface" means an interface that either is an official\n
standard defined by a recognized standards body, or, in the case of\n
interfaces specified for a particular programming language, one that\n
is widely used among developers working in that language.\n
\n
The "System Libraries" of an executable work include anything, other\n
than the work as a whole, that (a) is included in the normal form of\n
packaging a Major Component, but which is not part of that Major\n
Component, and (b) serves only to enable use of the work with that\n
Major Component, or to implement a Standard Interface for which an\n
implementation is available to the public in source code form.  A\n
"Major Component", in this context, means a major essential component\n
(kernel, window system, and so on) of the specific operating system\n
(if any) on which the executable work runs, or a compiler used to\n
produce the work, or an object code interpreter used to run it.\n
\n
The "Corresponding Source" for a work in object code form means all\n
the source code needed to generate, install, and (for an executable\n
work) run the object code and to modify the work, including scripts to\n
control those activities.  However, it does not include the work's\n
System Libraries, or general-purpose tools or generally available free\n
programs which are used unmodified in performing those activities but\n
which are not part of the work.  For example, Corresponding Source\n
includes interface definition files associated with source files for\n
the work, and the source code for shared libraries and dynamically\n
linked subprograms that the work is specifically designed to require,\n
such as by intimate data communication or control flow between those\n
subprograms and other parts of the work.\n
\n
The Corresponding Source need not include anything that users\n
can regenerate automatically from other parts of the Corresponding\n
Source.\n
\n
The Corresponding Source for a work in source code form is that\n
same work.\n
\n
2. Basic Permissions.\n
\n
All rights granted under this License are granted for the term of\n
copyright on the Program, and are irrevocable provided the stated\n
conditions are met.  This License explicitly affirms your unlimited\n
permission to run the unmodified Program.  The output from running a\n
covered work is covered by this License only if the output, given its\n
content, constitutes a covered work.  This License acknowledges your\n
rights of fair use or other equivalent, as provided by copyright law.\n
\n
You may make, run and propagate covered works that you do not\n
convey, without conditions so long as your license otherwise remains\n
in force.  You may convey covered works to others for the sole purpose\n
of having them make modifications exclusively for you, or provide you\n
with facilities for running those works, provided that you comply with\n
the terms of this License in conveying all material for which you do\n
not control copyright.  Those thus making or running the covered works\n
for you must do so exclusively on your behalf, under your direction\n
and control, on terms that prohibit them from making any copies of\n
your copyrighted material outside their relationship with you.\n
\n
Conveying under any other circumstances is permitted solely under\n
the conditions stated below.  Sublicensing is not allowed; section 10\n
makes it unnecessary.\n
\n
3. Protecting Users' Legal Rights From Anti-Circumvention Law.\n
\n
No covered work shall be deemed part of an effective technological\n
measure under any applicable law fulfilling obligations under article\n
11 of the WIPO copyright treaty adopted on 20 December 1996, or\n
similar laws prohibiting or restricting circumvention of such\n
measures.\n
\n
When you convey a covered work, you waive any legal power to forbid\n
circumvention of technological measures to the extent such circumvention\n
is effected by exercising rights under this License with respect to\n
the covered work, and you disclaim any intention to limit operation or\n
modification of the work as a means of enforcing, against the work's\n
users, your or third parties' legal rights to forbid circumvention of\n
technological measures.\n
\n
4. Conveying Verbatim Copies.\n
\n
You may convey verbatim copies of the Program's source code as you\n
receive it, in any medium, provided that you conspicuously and\n
appropriately publish on each copy an appropriate copyright notice;\n
keep intact all notices stating that this License and any\n
non-permissive terms added in accord with section 7 apply to the code;\n
keep intact all notices of the absence of any warranty; and give all\n
recipients a copy of this License along with the Program.\n
\n
You may charge any price or no price for each copy that you convey,\n
and you may offer support or warranty protection for a fee.\n
\n
5. Conveying Modified Source Versions.\n
\n
You may convey a work based on the Program, or the modifications to\n
produce it from the Program, in the form of source code under the\n
terms of section 4, provided that you also meet all of these conditions:\n
\n
a) The work must carry prominent notices stating that you modified\n
it, and giving a relevant date.\n
\n
b) The work must carry prominent notices stating that it is\n
released under this License and any conditions added under section\n
7.  This requirement modifies the requirement in section 4 to\n
"keep intact all notices".\n
\n
c) You must license the entire work, as a whole, under this\n
License to anyone who comes into possession of a copy.  This\n
License will therefore apply, along with any applicable section 7\n
additional terms, to the whole of the work, and all its parts,\n
regardless of how they are packaged.  This License gives no\n
permission to license the work in any other way, but it does not\n
invalidate such permission if you have separately received it.\n
\n
d) If the work has interactive user interfaces, each must display\n
Appropriate Legal Notices; however, if the Program has interactive\n
interfaces that do not display Appropriate Legal Notices, your\n
work need not make them do so.\n
\n
A compilation of a covered work with other separate and independent\n
works, which are not by their nature extensions of the covered work,\n
and which are not combined with it such as to form a larger program,\n
in or on a volume of a storage or distribution medium, is called an\n
"aggregate" if the compilation and its resulting copyright are not\n
used to limit the access or legal rights of the compilation's users\n
beyond what the individual works permit.  Inclusion of a covered work\n
in an aggregate does not cause this License to apply to the other\n
parts of the aggregate.\n
\n
6. Conveying Non-Source Forms.\n
\n
You may convey a covered work in object code form under the terms\n
of sections 4 and 5, provided that you also convey the\n
machine-readable Corresponding Source under the terms of this License,\n
in one of these ways:\n
\n
a) Convey the object code in, or embodied in, a physical product\n
(including a physical distribution medium), accompanied by the\n
Corresponding Source fixed on a durable physical medium\n
customarily used for software interchange.\n
\n
b) Convey the object code in, or embodied in, a physical product\n
(including a physical distribution medium), accompanied by a\n
written offer, valid for at least three years and valid for as\n
long as you offer spare parts or customer support for that product\n
model, to give anyone who possesses the object code either (1) a\n
copy of the Corresponding Source for all the software in the\n
product that is covered by this License, on a durable physical\n
medium customarily used for software interchange, for a price no\n
more than your reasonable cost of physically performing this\n
conveying of source, or (2) access to copy the\n
Corresponding Source from a network server at no charge.\n
\n
c) Convey individual copies of the object code with a copy of the\n
written offer to provide the Corresponding Source.  This\n
alternative is allowed only occasionally and noncommercially, and\n
only if you received the object code with such an offer, in accord\n
with subsection 6b.\n
\n
d) Convey the object code by offering access from a designated\n
place (gratis or for a charge), and offer equivalent access to the\n
Corresponding Source in the same way through the same place at no\n
further charge.  You need not require recipients to copy the\n
Corresponding Source along with the object code.  If the place to\n
copy the object code is a network server, the Corresponding Source\n
may be on a different server (operated by you or a third party)\n
that supports equivalent copying facilities, provided you maintain\n
clear directions next to the object code saying where to find the\n
Corresponding Source.  Regardless of what server hosts the\n
Corresponding Source, you remain obligated to ensure that it is\n
available for as long as needed to satisfy these requirements.\n
\n
e) Convey the object code using peer-to-peer transmission, provided\n
you inform other peers where the object code and Corresponding\n
Source of the work are being offered to the general public at no\n
charge under subsection 6d.\n
\n
A separable portion of the object code, whose source code is excluded\n
from the Corresponding Source as a System Library, need not be\n
included in conveying the object code work.\n
\n
A "User Product" is either (1) a "consumer product", which means any\n
tangible personal property which is normally used for personal, family,\n
or household purposes, or (2) anything designed or sold for incorporation\n
into a dwelling.  In determining whether a product is a consumer product,\n
doubtful cases shall be resolved in favor of coverage.  For a particular\n
product received by a particular user, "normally used" refers to a\n
typical or common use of that class of product, regardless of the status\n
of the particular user or of the way in which the particular user\n
actually uses, or expects or is expected to use, the product.  A product\n
is a consumer product regardless of whether the product has substantial\n
commercial, industrial or non-consumer uses, unless such uses represent\n
the only significant mode of use of the product.\n
\n
"Installation Information" for a User Product means any methods,\n
procedures, authorization keys, or other information required to install\n
and execute modified versions of a covered work in that User Product from\n
a modified version of its Corresponding Source.  The information must\n
suffice to ensure that the continued functioning of the modified object\n
code is in no case prevented or interfered with solely because\n
modification has been made.\n
\n
If you convey an object code work under this section in, or with, or\n
specifically for use in, a User Product, and the conveying occurs as\n
part of a transaction in which the right of possession and use of the\n
User Product is transferred to the recipient in perpetuity or for a\n
fixed term (regardless of how the transaction is characterized), the\n
Corresponding Source conveyed under this section must be accompanied\n
by the Installation Information.  But this requirement does not apply\n
if neither you nor any third party retains the ability to install\n
modified object code on the User Product (for example, the work has\n
been installed in ROM).\n
\n
The requirement to provide Installation Information does not include a\n
requirement to continue to provide support service, warranty, or updates\n
for a work that has been modified or installed by the recipient, or for\n
the User Product in which it has been modified or installed.  Access to a\n
network may be denied when the modification itself materially and\n
adversely affects the operation of the network or violates the rules and\n
protocols for communication across the network.\n
\n
Corresponding Source conveyed, and Installation Information provided,\n
in accord with this section must be in a format that is publicly\n
documented (and with an implementation available to the public in\n
source code form), and must require no special password or key for\n
unpacking, reading or copying.\n
\n
7. Additional Terms.\n
\n
"Additional permissions" are terms that supplement the terms of this\n
License by making exceptions from one or more of its conditions.\n
Additional permissions that are applicable to the entire Program shall\n
be treated as though they were included in this License, to the extent\n
that they are valid under applicable law.  If additional permissions\n
apply only to part of the Program, that part may be used separately\n
under those permissions, but the entire Program remains governed by\n
this License without regard to the additional permissions.\n
\n
When you convey a copy of a covered work, you may at your option\n
remove any additional permissions from that copy, or from any part of\n
it.  (Additional permissions may be written to require their own\n
removal in certain cases when you modify the work.)  You may place\n
additional permissions on material, added by you to a covered work,\n
for which you have or can give appropriate copyright permission.\n
\n
Notwithstanding any other provision of this License, for material you\n
add to a covered work, you may (if authorized by the copyright holders of\n
that material) supplement the terms of this License with terms:\n
\n
a) Disclaiming warranty or limiting liability differently from the\n
terms of sections 15 and 16 of this License; or\n
\n
b) Requiring preservation of specified reasonable legal notices or\n
author attributions in that material or in the Appropriate Legal\n
Notices displayed by works containing it; or\n
\n
c) Prohibiting misrepresentation of the origin of that material, or\n
requiring that modified versions of such material be marked in\n
reasonable ways as different from the original version; or\n
\n
d) Limiting the use for publicity purposes of names of licensors or\n
authors of the material; or\n
\n
e) Declining to grant rights under trademark law for use of some\n
trade names, trademarks, or service marks; or\n
\n
f) Requiring indemnification of licensors and authors of that\n
material by anyone who conveys the material (or modified versions of\n
it) with contractual assumptions of liability to the recipient, for\n
any liability that these contractual assumptions directly impose on\n
those licensors and authors.\n
\n
All other non-permissive additional terms are considered "further\n
restrictions" within the meaning of section 10.  If the Program as you\n
received it, or any part of it, contains a notice stating that it is\n
governed by this License along with a term that is a further\n
restriction, you may remove that term.  If a license document contains\n
a further restriction but permits relicensing or conveying under this\n
License, you may add to a covered work material governed by the terms\n
of that license document, provided that the further restriction does\n
not survive such relicensing or conveying.\n
\n
If you add terms to a covered work in accord with this section, you\n
must place, in the relevant source files, a statement of the\n
additional terms that apply to those files, or a notice indicating\n
where to find the applicable terms.\n
\n
Additional terms, permissive or non-permissive, may be stated in the\n
form of a separately written license, or stated as exceptions;\n
the above requirements apply either way.\n
\n
8. Termination.\n
\n
You may not propagate or modify a covered work except as expressly\n
provided under this License.  Any attempt otherwise to propagate or\n
modify it is void, and will automatically terminate your rights under\n
this License (including any patent licenses granted under the third\n
paragraph of section 11).\n
\n
However, if you cease all violation of this License, then your\n
license from a particular copyright holder is reinstated (a)\n
provisionally, unless and until the copyright holder explicitly and\n
finally terminates your license, and (b) permanently, if the copyright\n
holder fails to notify you of the violation by some reasonable means\n
prior to 60 days after the cessation.\n
\n
Moreover, your license from a particular copyright holder is\n
reinstated permanently if the copyright holder notifies you of the\n
violation by some reasonable means, this is the first time you have\n
received notice of violation of this License (for any work) from that\n
copyright holder, and you cure the violation prior to 30 days after\n
your receipt of the notice.\n
\n
Termination of your rights under this section does not terminate the\n
licenses of parties who have received copies or rights from you under\n
this License.  If your rights have been terminated and not permanently\n
reinstated, you do not qualify to receive new licenses for the same\n
material under section 10.\n
\n
9. Acceptance Not Required for Having Copies.\n
\n
You are not required to accept this License in order to receive or\n
run a copy of the Program.  Ancillary propagation of a covered work\n
occurring solely as a consequence of using peer-to-peer transmission\n
to receive a copy likewise does not require acceptance.  However,\n
nothing other than this License grants you permission to propagate or\n
modify any covered work.  These actions infringe copyright if you do\n
not accept this License.  Therefore, by modifying or propagating a\n
covered work, you indicate your acceptance of this License to do so.\n
\n
10. Automatic Licensing of Downstream Recipients.\n
\n
Each time you convey a covered work, the recipient automatically\n
receives a license from the original licensors, to run, modify and\n
propagate that work, subject to this License.  You are not responsible\n
for enforcing compliance by third parties with this License.\n
\n
An "entity transaction" is a transaction transferring control of an\n
organization, or substantially all assets of one, or subdividing an\n
organization, or merging organizations.  If propagation of a covered\n
work results from an entity transaction, each party to that\n
transaction who receives a copy of the work also receives whatever\n
licenses to the work the party's predecessor in interest had or could\n
give under the previous paragraph, plus a right to possession of the\n
Corresponding Source of the work from the predecessor in interest, if\n
the predecessor has it or can get it with reasonable efforts.\n
\n
You may not impose any further restrictions on the exercise of the\n
rights granted or affirmed under this License.  For example, you may\n
not impose a license fee, royalty, or other charge for exercise of\n
rights granted under this License, and you may not initiate litigation\n
(including a cross-claim or counterclaim in a lawsuit) alleging that\n
any patent claim is infringed by making, using, selling, offering for\n
sale, or importing the Program or any portion of it.\n
\n
11. Patents.\n
\n
A "contributor" is a copyright holder who authorizes use under this\n
License of the Program or a work on which the Program is based.  The\n
work thus licensed is called the contributor's "contributor version".\n
\n
A contributor's "essential patent claims" are all patent claims\n
owned or controlled by the contributor, whether already acquired or\n
hereafter acquired, that would be infringed by some manner, permitted\n
by this License, of making, using, or selling its contributor version,\n
but do not include claims that would be infringed only as a\n
consequence of further modification of the contributor version.  For\n
purposes of this definition, "control" includes the right to grant\n
patent sublicenses in a manner consistent with the requirements of\n
this License.\n
\n
Each contributor grants you a non-exclusive, worldwide, royalty-free\n
patent license under the contributor's essential patent claims, to\n
make, use, sell, offer for sale, import and otherwise run, modify and\n
propagate the contents of its contributor version.\n
\n
In the following three paragraphs, a "patent license" is any express\n
agreement or commitment, however denominated, not to enforce a patent\n
(such as an express permission to practice a patent or covenant not to\n
sue for patent infringement).  To "grant" such a patent license to a\n
party means to make such an agreement or commitment not to enforce a\n
patent against the party.\n
\n
If you convey a covered work, knowingly relying on a patent license,\n
and the Corresponding Source of the work is not available for anyone\n
to copy, free of charge and under the terms of this License, through a\n
publicly available network server or other readily accessible means,\n
then you must either (1) cause the Corresponding Source to be so\n
available, or (2) arrange to deprive yourself of the benefit of the\n
patent license for this particular work, or (3) arrange, in a manner\n
consistent with the requirements of this License, to extend the patent\n
license to downstream recipients.  "Knowingly relying" means you have\n
actual knowledge that, but for the patent license, your conveying the\n
covered work in a country, or your recipient's use of the covered work\n
in a country, would infringe one or more identifiable patents in that\n
country that you have reason to believe are valid.\n
\n
If, pursuant to or in connection with a single transaction or\n
arrangement, you convey, or propagate by procuring conveyance of, a\n
covered work, and grant a patent license to some of the parties\n
receiving the covered work authorizing them to use, propagate, modify\n
or convey a specific copy of the covered work, then the patent license\n
you grant is automatically extended to all recipients of the covered\n
work and works based on it.\n
\n
A patent license is "discriminatory" if it does not include within\n
the scope of its coverage, prohibits the exercise of, or is\n
conditioned on the non-exercise of one or more of the rights that are\n
specifically granted under this License.  You may not convey a covered\n
work if you are a party to an arrangement with a third party that is\n
in the business of distributing software, under which you make payment\n
to the third party based on the extent of your activity of conveying\n
the work, and under which the third party grants, to any of the\n
parties who would receive the covered work from you, a discriminatory\n
patent license (a) in connection with copies of the covered work\n
conveyed by you (or copies made from those copies), or (b) primarily\n
for and in connection with specific products or compilations that\n
contain the covered work, unless you entered into that arrangement,\n
or that patent license was granted, prior to 28 March 2007.\n
\n
Nothing in this License shall be construed as excluding or limiting\n
any implied license or other defenses to infringement that may\n
otherwise be available to you under applicable patent law.\n
\n
12. No Surrender of Others' Freedom.\n
\n
If conditions are imposed on you (whether by court order, agreement or\n
otherwise) that contradict the conditions of this License, they do not\n
excuse you from the conditions of this License.  If you cannot convey a\n
covered work so as to satisfy simultaneously your obligations under this\n
License and any other pertinent obligations, then as a consequence you may\n
not convey it at all.  For example, if you agree to terms that obligate you\n
to collect a royalty for further conveying from those to whom you convey\n
the Program, the only way you could satisfy both those terms and this\n
License would be to refrain entirely from conveying the Program.\n
\n
13. Use with the GNU Affero General Public License.\n
\n
Notwithstanding any other provision of this License, you have\n
permission to link or combine any covered work with a work licensed\n
under version 3 of the GNU Affero General Public License into a single\n
combined work, and to convey the resulting work.  The terms of this\n
License will continue to apply to the part which is the covered work,\n
but the special requirements of the GNU Affero General Public License,\n
section 13, concerning interaction through a network will apply to the\n
combination as such.\n
\n
14. Revised Versions of this License.\n
\n
The Free Software Foundation may publish revised and/or new versions of\n
the GNU General Public License from time to time.  Such new versions will\n
be similar in spirit to the present version, but may differ in detail to\n
address new problems or concerns.\n
\n
Each version is given a distinguishing version number.  If the\n
Program specifies that a certain numbered version of the GNU General\n
Public License "or any later version" applies to it, you have the\n
option of following the terms and conditions either of that numbered\n
version or of any later version published by the Free Software\n
Foundation.  If the Program does not specify a version number of the\n
GNU General Public License, you may choose any version ever published\n
by the Free Software Foundation.\n
\n
If the Program specifies that a proxy can decide which future\n
versions of the GNU General Public License can be used, that proxy's\n
public statement of acceptance of a version permanently authorizes you\n
to choose that version for the Program.\n
\n
Later license versions may give you additional or different\n
permissions.  However, no additional obligations are imposed on any\n
author or copyright holder as a result of your choosing to follow a\n
later version.\n
\n
15. Disclaimer of Warranty.\n
\n
THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY\n
APPLICABLE LAW.  EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT\n
HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM "AS IS" WITHOUT WARRANTY\n
OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,\n
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR\n
PURPOSE.  THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM\n
IS WITH YOU.  SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF\n
ALL NECESSARY SERVICING, REPAIR OR CORRECTION.\n
\n
16. Limitation of Liability.\n
\n
IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING\n
WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MODIFIES AND/OR CONVEYS\n
THE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY\n
GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE\n
USE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF\n
DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD\n
PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER PROGRAMS),\n
EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF\n
SUCH DAMAGES.\n
\n
17. Interpretation of Sections 15 and 16.\n
\n
If the disclaimer of warranty and limitation of liability provided\n
above cannot be given local legal effect according to their terms,\n
reviewing courts shall apply local law that most closely approximates\n
an absolute waiver of all civil liability in connection with the\n
Program, unless a warranty or assumption of liability accompanies a\n
copy of the Program in return for a fee.\n
\n
    END OF TERMS AND CONDITIONS\n
\n
How to Apply These Terms to Your New Programs\n
\n
If you develop a new program, and you want it to be of the greatest\n
possible use to the public, the best way to achieve this is to make it\n
free software which everyone can redistribute and change under these terms.\n
\n
To do so, attach the following notices to the program.  It is safest\n
to attach them to the start of each source file to most effectively\n
state the exclusion of warranty; and each file should have at least\n
the "copyright" line and a pointer to where the full notice is found.\n
\n
<one line to give the program's name and a brief idea of what it does.>\n
Copyright (C) <year>  <name of author>\n
\n
This program is free software: you can redistribute it and/or modify\n
it under the terms of the GNU General Public License as published by\n
the Free Software Foundation, either version 3 of the License, or\n
(at your option) any later version.\n
\n
This program is distributed in the hope that it will be useful,\n
but WITHOUT ANY WARRANTY; without even the implied warranty of\n
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n
GNU General Public License for more details.\n
\n
You should have received a copy of the GNU General Public License\n
along with this program.  If not, see <https://www.gnu.org/licenses/>.\n
\n
Also add information on how to contact you by electronic and paper mail.\n
\n
If the program does terminal interaction, make it output a short\n
notice like this when it starts in an interactive mode:\n
\n
<program>  Copyright (C) <year>  <name of author>\n
This program comes with ABSOLUTELY NO WARRANTY; for details type \`show w'.\n
This is free software, and you are welcome to redistribute it\n
under certain conditions; type \`show c' for details.\n
\n
The hypothetical commands \`show w' and \`show c' should show the appropriate\n
parts of the General Public License.  Of course, your program's commands\n
might be different; for a GUI interface, you would use an "about box".\n
\n
You should also get your employer (if you work as a programmer) or school,\n
if any, to sign a "copyright disclaimer" for the program, if necessary.\n
For more information on this, and how to apply and follow the GNU GPL, see\n
<https://www.gnu.org/licenses/>.\n
\n
The GNU General Public License does not permit incorporating your program\n
into proprietary programs.  If your program is a subroutine library, you\n
may consider it more useful to permit linking proprietary applications with\n
the library.  If this is what you want to do, use the GNU Lesser General\n
Public License instead of this License.  But first, please read\n
<https://www.gnu.org/licenses/why-not-lgpl.html>.
`,
        badge: "![GNU GPLv3](https://img.shields.io/badge/license-GNU%20GPLv3-green)"
      }
      input = {...input, ...licensing};
      return input;
  }
    default: {
      licensing = {
        license: "https://choosealicense.com",
        badge: "https://shields.io/"
      }
      input = {...input, ...licensing};
      return input;
    }
  }
}

// Defines generateREADME function
// Uses input from prompts in a markdown-formatted text
const generateREADME = ({ project, badge, desc, install, usage, tests, github, email, contributing, credits, license }) => 
`# ${project}

## Badges
${badge}

## Description
${desc}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Tests](#tests)
- [Questions](#questions)
- [Contributing](#contributing)
- [Credits](#credits)
- [License](#license)

## Installation
${install}

## Usage
${usage}

## Tests
${tests}

## Questions
Questions can be directed to this GitHub profile or this email.\n
GitHub: [${github}](https://github.com/${github})\n
Email: [${email}](mailto:${email})

## Contributing
${contributing}

## Credits
${credits}

## License
${license}
`;

// Defines init function
const init = () => {
  // Makes the Output folder if it doesn't already exist
  fs.mkdir('./Output/', { recursive: true }, (err) => {
    if (err) throw err;
  });
  // Runs promptQuestions function
  promptQuestions()
  // Once promptQuestions is completed, user input is passed to licenseSelect Function
  .then((input) => licenseSelect(input))
  // Once licenseSelect function is completed, licensedInput is passed to writeFile function and generates the READEME file in the Output folder
  .then((licensedInput) => writeFile("./Output/README.md", generateREADME(licensedInput)))
  // Success message or error message is printed to the console
  .then(() => console.log("Success! Created README in Output folder"))
  .catch((err) => console.error(err));
}

// Runs init function when index.js runs
init();
