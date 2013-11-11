package geogebra.common.gui.dialog.options.model;

import geogebra.common.kernel.geos.AngleProperties;
import geogebra.common.kernel.geos.GeoAngle;
import geogebra.common.kernel.geos.GeoElement;
import geogebra.common.kernel.kernelND.GeoElementND;
import geogebra.common.main.App;
import geogebra.common.main.Localization;

import java.util.ArrayList;
import java.util.List;

public class ReflexAngleModel extends MultipleOptionsModel {
	public interface IReflexAngleListener extends IComboListener {
		void setComboLabels();
	}

	private boolean hasOrientation;
	private boolean isDrawable;
	private boolean isDefaults;
	private App app;
	public ReflexAngleModel(IReflexAngleListener listener, App app, boolean isDefaults) {
		super(listener);
		this.app = app;
		this.isDefaults = isDefaults;
	}

	@Override
	public void updateProperties() {
		AngleProperties temp, geo0 = (AngleProperties) getObjectAt(0);
		boolean equalangleStyle = true;
		boolean hasOrientationOld = hasOrientation;
		boolean isDrawableOld = isDrawable;
		hasOrientation = true;
		isDrawable = true;

		for (int i = 0; i < getGeosLength(); i++) {
			temp = (AngleProperties) getObjectAt(i);
			if (!temp.hasOrientation()) {
				hasOrientation = false;
			}
			if (!temp.isDrawable()) {
				isDrawable = false;
			}
			if (geo0.getAngleStyle() != temp.getAngleStyle()) {
				equalangleStyle = false;
			}

		}

		if (hasOrientation != hasOrientationOld || isDrawableOld != isDrawable) {
			((IReflexAngleListener)getListener()).setComboLabels();
		}

		if (equalangleStyle) {
			getListener().setSelectedIndex(geo0.getAngleStyle().xmlVal);
		}


	}

	@Override
	public List<String> getChoiches(Localization loc) {
		List<String> result = new ArrayList<String>();

		if (hasOrientation) {
			int length = GeoAngle.INTERVAL_MIN.length;

			if (isDrawable) {
				// don't want to allow (-inf, +inf)
				length --;
			}

			for (int i = 0; i < length; i++) {
				result.add(loc.getPlain("AandB",
						GeoAngle.INTERVAL_MIN[i],
						GeoAngle.INTERVAL_MAX[i]));
			}
		} else {// only 180° wide interval are possible
			result.add(loc.getPlain("AandB",
					GeoAngle.INTERVAL_MIN[1], GeoAngle.INTERVAL_MAX[1]));
			result.add(loc.getPlain("AandB",
					GeoAngle.INTERVAL_MIN[2], GeoAngle.INTERVAL_MAX[2]));
		}
		return result;
	}

	@Override
	protected boolean isValidAt(int index){
		GeoElement geo = getGeoAt(index);
		return !((geo.isIndependent() && !isDefaults)
				|| !(geo instanceof AngleProperties));
	};

	@Override
	protected void apply(int index, int value) {
		AngleProperties geo = (AngleProperties) getObjectAt(index);
		geo.setAngleStyle(value);
		((GeoElementND) geo).updateRepaint();
	}

	public boolean hasOrientation() {
		return hasOrientation;
	}


}
