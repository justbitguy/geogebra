
package org.geogebra.common.kernel.geos;

import org.geogebra.common.BaseUnitTest;
import org.geogebra.common.kernel.geos.properties.AlignmentType;
import org.geogebra.common.main.App;
import org.junit.Assert;
import org.junit.Test;

public class LinkedGeosForInputBoxTest extends BaseUnitTest {


    @Test
    public void symbolicFunctionTest() {
		add("f = x+1");
		add("g = 2f(x+2)+1");
		GeoInputBox inputBox1 = (GeoInputBox) add("InputBox(f)");
		GeoInputBox inputBox2 = (GeoInputBox) add("InputBox(g)");
		inputBox2.setSymbolicMode(true, false);
		Assert.assertEquals("x + 1", inputBox1.getText());
		Assert.assertEquals("2f(x + 2) + 1", inputBox2.getTextForEditor());
	}

    @Test
    public void inputBoxTextAlignmentIsInXMLTest() {
        App app = getApp();
        add("A = (1,1)");
        GeoInputBox inputBox = (GeoInputBox) add("B = Inputbox(A)");
        Assert.assertEquals(AlignmentType.LEFT, inputBox.getAlignment());
        inputBox.setAlignment(AlignmentType.CENTER);
        Assert.assertEquals(AlignmentType.CENTER, inputBox.getAlignment());
        String appXML = app.getXML();
        app.setXML(appXML, true);
        inputBox = (GeoInputBox) lookup("B");
        Assert.assertEquals(AlignmentType.CENTER, inputBox.getAlignment());
    }
}
