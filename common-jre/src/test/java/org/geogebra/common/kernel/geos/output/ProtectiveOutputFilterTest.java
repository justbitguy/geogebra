package org.geogebra.common.kernel.geos.output;

import org.geogebra.common.BaseUnitTest;
import org.geogebra.common.kernel.geos.GeoConic;
import org.geogebra.common.kernel.geos.GeoElement;
import org.geogebra.common.kernel.geos.GeoFunction;
import org.geogebra.common.kernel.geos.GeoLine;
import org.geogebra.common.kernel.kernelND.GeoElementND;
import org.junit.Before;
import org.junit.Test;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

public class ProtectiveOutputFilterTest extends BaseUnitTest {

	private ProtectiveOutputFilter outputFilter;

	@Before
	public void setUp() {
		outputFilter = new ProtectiveOutputFilter();
	}

	@Test
	public void shouldFilterCaption() {
		GeoLine lineWithCommand = createLineWithCommand();
		assertThat(outputFilter.shouldFilterCaption(lineWithCommand), is(true));

		GeoFunction userFunction = createUserFunction();
		assertThat(outputFilter.shouldFilterCaption(userFunction), is(false));

		GeoConic conicWithUserEquation = createConicWithUserEquation();
		assertThat(outputFilter.shouldFilterCaption(conicWithUserEquation), is(false));
	}

	private GeoLine createLineWithCommand() {
		addAvInput("A = (1, 2)");
		addAvInput("B = (2, 3)");
		return addAvInput("f = Line(A, B)");
	}

	private GeoFunction createUserFunction() {
		return addAvInput("g(x) = x");
	}

	private GeoConic createConicWithUserEquation() {
		return addAvInput("c: xx + yy = 1");
	}

	@Test
	public void filterCaption() {
		GeoLine line = createLineWithCommand();

		checkCaption(line, GeoElementND.LABEL_NAME, "f");
		checkCaption(line, GeoElementND.LABEL_NAME_VALUE, "f: Line(A, B)");
		checkCaption(line, GeoElementND.LABEL_VALUE, "Line(A, B)");
		checkCaption(line, GeoElementND.LABEL_CAPTION, "f");
		checkCaption(line, GeoElementND.LABEL_CAPTION_VALUE, "f: Line(A, B)");
	}

	private void checkCaption(GeoElement element, int labelMode, String expectedLabelText) {
		element.setLabelMode(labelMode);
		assertThat(outputFilter.filterCaption(element), is(expectedLabelText));
	}
}