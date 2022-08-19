# Customising the webapp for partner or private instances

Overview of the customization options available via config for partners's or private instances and the process to configure them.

## Intro

The Open Targets Platform allows for easy customisation of the interface via config file and environmental variables at run time. This is particularly useful for partners or those running their own instance of the platform.
Here we will look at the various options and how to configure them.

## How things are configured

The front end code has a number of options configured in `config.js`: here default values are defined.
Defaults can be overwritten via environmental variables - in Open Targets this is implemeneted by the back end team.

## Options

Below is the list of the options available. These only accept primitive values. In certain cases we can pass a comma separated list of values.

In a private instance of the platform

### Basic options

The following options work regardless of whether `isPartnerPreview` is set to `true` or `false`.

#### configUrlApi

URL of the platform API

#### configGeneticsPortalUrl

URL for links to corresponding pages of the Open Targets Genetics portal,
no trailing slash;
defaults to `https://genetics.opentargets.org`

#### configPrimaryColor

Define the primary colour used by the Material UI components and visualisations. Default Open Targets blue is `#3489ca`.

#### partnerColorRange

Define a custom colour range to be used in the visualisations such as the heatmaps on the associations pages. Default Open Targets blues scale is `'#e5edf4,#ccdcea,#b2cbe0,#99b9d6,#7fa8cc,#6697c1,#4c85b7,#3274ad,#1963a3,#005299'`.

#### isPartnerPreview

Boolean flag to enable the use of customizations. The options below work only if `isPartnerPreview` mode is enabled.

### Evidence and profile pages options

On the evidence, target profile page, disease profile page and drug profile page we can specify:

1. which widgets are private (if any)
1. which widgets we want to hide (if any)
   Private widgets will show a "lock" icon next to the widget name.
   The lock icon is also displaied in the page header.

Note: these options only work if `isPartnerPreview` is set to `true`.

#### hideDiseaseSectionIds

Comma separated (no spaces) list of ids of widgets to _hide_ on the disease profile page. Example: `'bibliography,otProjects'`.

#### partnerDiseaseSectionIds

Comma separated (no spaces) list of ids of widgets on the disease profile page that are `private`. Example: `'bibliography,otProjects'`.

#### hideTargetSectionIds

Comma separated (no spaces) list of ids of widgets to _hide_ on the target profile page. Example: `'bibliography,otProjects'`.

#### partnerTargetSectionIds

Comma separated (no spaces) list of ids of widgets on the target profile page that are `private`. Example: `'bibliography,otProjects'`.

#### hideDrugSectionIds

Comma separated (no spaces) list of ids of widgets to _hide_ on the drug profile page. Example: `'bibliography,otProjects'`.

#### partnerDrugSectionIds

Comma separated (no spaces) list of ids of widgets on the drug profile page that are `private`. Example: `'bibliography,otProjects'`.

#### hideEvidenceSectionIds

Comma separated (no spaces) list of ids of widgets to _hide_ on the evidence profile page. Example: `'bibliography,otProjects'`.

#### partnerEvidenceSectionIds

Comma separated (no spaces) list of ids of widgets on the evidence profile page that are `private`. Example: `'bibliography,otProjects'`.

### Associations pages options

On the target and disease association pages we can customize datatypes, in a similar way to widgets on profile pages.

#### hideDataTypes

Comma separated (no spaces) list of datatypes ids to _hide_ on the associations pages. Hidden datatypes won't show in the facets and also in the heatmap (i.e. the relevant column will be hidden). Example: `'literature,animal_model'`.

#### partnerDataTypes

Comma separated (no spaces) list of datatypes (ids) that are `private`.
Partner datatypes show lock the icon next to the name in the facets. Example: `'ot_partner'`.

#### partnerDataSources

Comma separated (no spaces) list of datasources (ids) that are `private`.
Partner datasources show the lock icon next to the name in the facets. Example: `'ot_crispr'`.
