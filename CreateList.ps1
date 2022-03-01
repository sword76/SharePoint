Add-PSSnapin Microsoft.SharePoint.PowerShell -ErrorAction SilentlyContinue
 
#Function to create a custom list
Function Create-List($SiteURL, $ListName)
{
    #Set the Error Action
    $ErrorActionPreference = "Stop"
 
    Try {
        $Web = Get-SPWeb -Identity $SiteURL
        $ListTemplate = [Microsoft.SharePoint.SPListTemplateType]::GenericList
        
        #Check if List with specific name exists
        if($Web.Lists.TryGetList($ListName) -eq $null)
        {
            $List = $Web.Lists.Add($ListName, $ListName, $ListTemplate) 
            write-host "List Created Successfully!" -ForegroundColor Green
        }
        else
        {
            write-host "List with a specific name already exists!" -ForegroundColor Red
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
 
#Parameters to create a new List
$SiteURL="http://intranet.crescent.com/"
$ListName = "Customer Directory"
 
#Call the function to create a new custom list
Create-List $SiteURL $ListName


#Read more: https://www.sharepointdiary.com/2015/01/create-new-custom-list-in-sharepoint-using-powershell.html#ixzz7MK57AX7X