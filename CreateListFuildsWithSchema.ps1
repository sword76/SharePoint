Add-PSSnapin Microsoft.SharePoint.PowerShell -ErrorAction SilentlyContinue
 
Function Add-FieldToList($SiteURL,$ListName, $FieldName, $FieldType, $IsRequired)
{
    #Set the Error Action
    $ErrorActionPreference = "Stop"
 
    Try{
        #Get the List
        $List = (Get-SPWeb $SiteURL).Lists.TryGetList($ListName)
         
        #Check if List with specific name exists
        if($List -ne $null)
        {
            if(!$List.Fields.ContainsField($FieldName))
            {     
                #Add columns to the List
                $List.Fields.Add($FieldName,$FieldType,$IsRequired)
 
                #Update the List
                $List.Update()
 
                #Update the default view to include the new column
                $View = $List.DefaultView # OR $List.Views["All Items"]
                $View.ViewFields.Add($FieldName)
                $View.Update()
 
                write-host "New Column '$FieldName' Added to the List!" -ForegroundColor Green
            }
            else
            {
                write-host "Field '$FieldName' Already Exists in the List" -ForegroundColor Red
            }
        }
        else
        {
            write-host "List '$ListName' doesn't exists!" -ForegroundColor Red
        }       
    }
     catch {
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
    finally {
        #Reset the Error Action to Default
        $ErrorActionPreference = "Continue"
    }
}
 
#Parameters
$SiteURL="https://intranet.crescent.com/"
$ListName = "Customer Directory"
 
#Add 'Name' - Single Line of Text Field
$FieldType = [Microsoft.SharePoint.SPFieldType]::Text
$FieldName="Name"
$IsRequired = $False
#Call the function to Add Field to List
Add-FieldToList $SiteURL $ListName $FieldName $FieldType $IsRequired
 
#Add Phone Number - Number Field
$FieldType = [Microsoft.SharePoint.SPFieldType]::Number
$FieldName="Phone Number"
$IsRequired = $False
#Call the funtion to Add Field to List
Add-FieldToList $SiteURL $ListName $FieldName $FieldType $IsRequired
 
#Date of Joing - Date Field
$FieldType = [Microsoft.SharePoint.SPFieldType]::DateTime
$FieldName="Date of Join"
$IsRequired = $False
#Call the funtion to Add Field to List
Add-FieldToList $SiteURL $ListName $FieldName $FieldType $IsRequired


#Read more: https://www.sharepointdiary.com/2015/12/how-to-add-column-to-sharepoint-list-using-powershell.html#ixzz7MK52gBGO