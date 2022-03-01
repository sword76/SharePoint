#Field Schemas
$NameFldSchema="<Field Type='Text' DisplayName='Name' Required='False' MaxLength='255' StaticName='Name' Name='Name' />"
$PhoneNoFldSchema="<Field Type='Number' DisplayName='Phone Number' Required='False' MaxLength='255' StaticName='PhoneNumber' Name='PhoneNumber' />"
$DOBFldSchema="<Field Type='DateTime' DisplayName='Date of Birth' Required='False' MaxLength='255' StaticName='DateOfBirth' Name='DateOfBirth' /> "
#For Field schemas, Refer: https://msdn.microsoft.com/en-us/library/office/aa979575(v=office.15).aspx
   
#Add Columns to the List
$List.Fields.AddFieldAsXml($NameFldSchema, $True,[Microsoft.SharePoint.SPAddFieldOptions]::AddFieldToDefaultView)


#Read more: https://www.sharepointdiary.com/2015/12/how-to-add-column-to-sharepoint-list-using-powershell.html#ixzz7MK4xH5Ds